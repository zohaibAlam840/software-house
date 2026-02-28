import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory cache to prevent duplicate submissions from the same email within a short timeframe.
// Note: In serverless deployments, this resets on cold boots, but it stops immediate rapid-fire clicking.
const recentlySubmittedEmails = new Map<string, number>();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, service, details } = body;

        // Validation
        if (!name || !email || !details) {
            return NextResponse.json(
                { error: 'Name, email, and details are required fields.' },
                { status: 400 }
            );
        }

        // --- Duplicate Submission Check (Rate Limiting) ---
        // Block consecutive submissions from the same email for 1 hour
        const now = Date.now();
        const RATE_LIMIT_MS = 60 * 60 * 1000; // 1 hour
        if (recentlySubmittedEmails.has(email)) {
            const lastSubmitted = recentlySubmittedEmails.get(email)!;
            if (now - lastSubmitted < RATE_LIMIT_MS) {
                return NextResponse.json(
                    { error: "You've already submitted a request recently. We will be in touch soon!" },
                    { status: 429 } // Too Many Requests
                );
            }
        }

        // IMPORTANT: The user needs to configure these environment variables
        // For development/demonstration, handle missing env vars gracefully
        const userEmail = process.env.EMAIL_USER;
        const userPass = process.env.EMAIL_PASS;
        const receiverEmail = "contact@giantsoftech.com";

        if (!userEmail || !userPass) {
            console.warn('EMAIL_USER and EMAIL_PASS environment variables are not set. Nodemailer cannot send the email.');
            // We'll return success to not block UI development, but log a warning.
            return NextResponse.json({
                message: 'Form submitted successfully (Email sending skipped due to missing credentials).'
            });
        }

        // Configure Nodemailer Transport for Hostinger
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true, // true for port 465
            auth: {
                user: userEmail,
                pass: userPass,
            },
        });

        // --- 1. Admin Email (Lead Notification) ---
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #d32630; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">New Lead Submission</h2>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p style="margin: 0;"><strong>Service Interested:</strong> ${service || 'Not specified'}</p>
                </div>
                <h3 style="color: #2b2b2b;">Project Details:</h3>
                <div style="background-color: #fcfcfc; padding: 15px; border-left: 4px solid #d32630; border-radius: 4px; color: #444; line-height: 1.6;">
                    ${details.replace(/\n/g, '<br>')}
                </div>
                <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
                    This email was sent from the GiantsOfTech Contact Form.
                </p>
            </div>
        `;

        const adminMailOptions = {
            from: `"GiantsOfTech Leads" <${userEmail}>`,
            to: receiverEmail,
            replyTo: email,
            subject: `🚨 New Lead: ${service || 'General Inquiry'} from ${name}`,
            html: adminHtml,
        };

        // --- 2. Client Email (Auto-Reply) ---
        const clientHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; color: #2b2b2b;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2b2b2b; margin-bottom: 5px;">GiantsOf<span style="color: #d32630;">Tech</span></h1>
                    <p style="color: #666; font-size: 14px;">Your Next Idea Starts Here</p>
                </div>
                
                <h2 style="color: #2b2b2b; font-size: 20px;">Hello ${name},</h2>
                
                <p style="line-height: 1.6; color: #444;">
                    Thank you for reaching out to us! We have successfully received your request regarding <strong>${service || 'our services'}</strong>.
                </p>
                
                <p style="line-height: 1.6; color: #444;">
                    Our team is reviewing your project details and will get back to you within the next 24 hours to discuss how we can bring your vision to life.
                </p>

                <div style="background-color: #fdf2f4; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center; border: 1px solid #fce4e8;">
                    <p style="margin: 0; color: #d32630; font-weight: bold;">We look forward to working together!</p>
                </div>

                <p style="color: #888; font-size: 12px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
                    Best regards,<br>
                    <strong>The GiantsOfTech Team</strong><br>
                    <a href="mailto:contact@giantsoftech.com" style="color: #d32630;">contact@giantsoftech.com</a>
                </p>
            </div>
        `;

        const clientMailOptions = {
            from: `"GiantsOfTech" <${userEmail}>`,
            to: email,
            subject: `We've received your request, ${name}!`,
            html: clientHtml,
        };

        // Send Both Emails concurrently using Promise.all
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(clientMailOptions)
        ]);

        // Record the successful submission to prevent immediate duplicates
        recentlySubmittedEmails.set(email, Date.now());

        return NextResponse.json({ message: 'Emails sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('API Contact Route Error:', error);
        return NextResponse.json(
            { error: 'An error occurred while sending the message. Please try again later.' },
            { status: 500 }
        );
    }
}
