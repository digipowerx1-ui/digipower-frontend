import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
// import HelmetProviderWrapper from "@/components/HelmetProviderWrapper";
import { QueryProvider } from "@/components/query-provider";

export const metadata: Metadata = {
    title: "DigiPower",
    description: "DigiPower Application",
    verification: {
        google: "up7xHoLHfsB_lpzujMgWum-a6HW8pzTxTIR5YWspXrU",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-11V1QZEL2H"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-11V1QZEL2H');
                    `}
                </Script>
            </head>
            <body>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <TooltipProvider>
                        <QueryProvider>
                            {children}
                        </QueryProvider>
                        <Toaster />
                        <SonnerToaster />
                    </TooltipProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
