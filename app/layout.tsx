import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE = "https://giantsoftech.com";

export const metadata: Metadata = {
    metadataBase: new URL(BASE),
    title: {
        default: "GiantsOfTech — Software Development & Digital Solutions",
        template: "%s — GiantsOfTech",
    },
    description:
        "GiantsOfTech builds market-ready software, mobile apps, brand identities, and digital experiences. 50+ projects delivered. 9+ years of expertise.",
    keywords: [
        "software development",
        "web development",
        "mobile app development",
        "Next.js agency",
        "React development",
        "UI/UX design",
        "digital agency",
        "GiantsOfTech",
        "Pakistan software house",
    ],
    authors: [{ name: "GiantsOfTech", url: BASE }],
    creator: "GiantsOfTech",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: BASE,
        siteName: "GiantsOfTech",
        title: "GiantsOfTech — Software Development & Digital Solutions",
        description:
            "We build market-ready software, mobile apps, brand identities, and digital experiences that lead your industry.",
        images: [{ url: "/logo.png", width: 1200, height: 630, alt: "GiantsOfTech" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "GiantsOfTech — Software Development & Digital Solutions",
        description: "50+ projects. 9+ years. Market-ready software built to scale.",
        images: ["/logo.png"],
    },
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1 },
    },
    alternates: { canonical: BASE },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
