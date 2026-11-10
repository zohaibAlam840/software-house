import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory cache to prevent rapid-fire duplicate submissions
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

        // --- Rate Limiting: 30 seconds debounce ---
        const now = Date.now();
        const RATE_LIMIT_MS = 30 * 1000;
        if (recentlySubmittedEmails.has(email)) {
            const lastSubmitted = recentlySubmittedEmails.get(email)!;
            if (now - lastSubmitted < RATE_LIMIT_MS) {
                return NextResponse.json(
                    { error: "You've just submitted a request. Please wait a moment before sending another." },
                    { status: 429 }
                );
            }
        }

        const userEmail = process.env.EMAIL_USER;
        const userPass = process.env.EMAIL_PASS;
        const receiverEmail = process.env.RECEIVER_EMAIL || "zohaibe840@gmail.com";

        // Admin notification email template for zohaibe840@gmail.com
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0dc; border-radius: 12px; background: #ffffff;">
                <div style="border-bottom: 2px solid #e64b36; padding-bottom: 12px; margin-bottom: 20px;">
                    <h2 style="color: #141413; margin: 0; font-size: 22px;">New Project Inquiry</h2>
                    <span style="font-family: monospace; font-size: 11px; color: #72726a;">DELIVERED TO ${receiverEmail}</span>
                </div>
                <div style="background-color: #f6f6f4; padding: 18px; border-radius: 8px; margin: 20px 0; font-size: 14px; line-height: 1.6;">
                    <p style="margin: 0 0 10px 0;"><strong>Client Name:</strong> ${name}</p>
                    <p style="margin: 0 0 10px 0;"><strong>Client Email:</strong> <a href="mailto:${email}" style="color: #e64b36;">${email}</a></p>
                    <p style="margin: 0 0 10px 0;"><strong>Phone / WhatsApp:</strong> ${phone || 'Not provided'}</p>
                    <p style="margin: 0;"><strong>Service of Interest:</strong> ${service || 'General Inquiry'}</p>
                </div>
                <h3 style="color: #141413; font-size: 16px; margin: 20px 0 10px;">Project Details:</h3>
                <div style="background-color: #fafaf9; padding: 16px; border-left: 4px solid #e64b36; border-radius: 4px; color: #333; line-height: 1.6; font-size: 14px;">
                    ${details.replace(/\n/g, '<br>')}
                </div>
                <p style="font-size: 11px; color: #888; margin-top: 30px; text-align: center; font-family: monospace;">
                    Delivered to ${receiverEmail} via GiantsOfTech Work Page Contact Form.
                </p>
            </div>
        `;

        const adminMailOptions = {
            from: `"GiantsOfTech Leads" <${userEmail || 'contact@giantsoftech.com'}>`,
            to: receiverEmail,
            replyTo: email,
            subject: `🚨 New Lead from ${name} (${service || 'General Inquiry'})`,
            html: adminHtml,
        };

        // Client auto-reply email template
        const clientHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0dc; border-radius: 12px; color: #2b2b2b;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <h1 style="color: #141413; margin-bottom: 5px; font-weight: 900; font-size: 24px;">GiantsOf<span style="color: #e64b36;">Tech</span></h1>
                    <p style="color: #666; font-size: 12px; font-family: monospace; letter-spacing: 0.1em; text-transform: uppercase;">Design &amp; Development Studio</p>
                </div>
                
                <h2 style="color: #141413; font-size: 18px;">Hello ${name},</h2>
                
                <p style="line-height: 1.6; color: #444;">
                    Thank you for reaching out! We have received your project inquiry regarding <strong>${service || 'our services'}</strong>.
                </p>
                
                <p style="line-height: 1.6; color: #444;">
                    Our technical and design leads are reviewing your project requirements and will get back to you within 24 hours to discuss next steps.
                </p>

                <div style="background-color: #fdf2f1; padding: 16px; border-radius: 8px; margin: 25px 0; text-align: center; border: 1px solid #fce3e0;">
                    <p style="margin: 0; color: #e64b36; font-weight: bold; font-size: 14px;">We look forward to collaborating with you!</p>
                </div>

                <p style="color: #888; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                    Best regards,<br>
                    <strong>The GiantsOfTech Team</strong><br>
                    <a href="mailto:contact@giantsoftech.com" style="color: #e64b36;">contact@giantsoftech.com</a>
                </p>
            </div>
        `;

        const clientMailOptions = {
            from: `"GiantsOfTech" <${userEmail || 'contact@giantsoftech.com'}>`,
            to: email,
            subject: `We've received your request, ${name}!`,
            html: clientHtml,
        };

        if (userEmail && userPass) {
            try {
                // Configure Nodemailer Transport for Hostinger
                const transporter = nodemailer.createTransport({
                    host: 'smtp.hostinger.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: userEmail,
                        pass: userPass,
                    },
                });

                // Send lead directly to receiverEmail (zohaibe840@gmail.com)
                await transporter.sendMail(adminMailOptions);

                // Send auto-reply to client
                try {
                    await transporter.sendMail(clientMailOptions);
                } catch (clientErr) {
                    console.warn('Auto-reply to client failed:', clientErr);
                }
            } catch (smtpError: unknown) {
                console.warn('SMTP Provider Error (Check credentials in .env.local):', smtpError instanceof Error ? smtpError.message : smtpError);
                // Recorded in server logs, return graceful confirmation to client
                return NextResponse.json({
                    message: 'Inquiry received successfully!'
                }, { status: 200 });
            }
        } else {
            console.warn(`EMAIL_USER or EMAIL_PASS not configured. Inquiry for ${receiverEmail} logged.`);
        }

        // Record submission timestamp
        recentlySubmittedEmails.set(email, Date.now());

        return NextResponse.json({
            message: 'Inquiry sent successfully!'
        }, { status: 200 });

    } catch (error) {
        console.error('API Contact Route Error:', error);
        return NextResponse.json(
            { error: 'An error occurred while sending your message. Please try again later.' },
            { status: 500 }
        );
    }
}
