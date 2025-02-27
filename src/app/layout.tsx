"use client";

import "./globals.css";
import { useEffect } from "react";
import { authenticateUser, getAccessToken } from "@/services/authService";

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {

    useEffect(() => {
        setTimeout(() => {
            const token = getAccessToken();
            if (!token) {
                authenticateUser();
            }
        }, 5000)
    }, []);

    return (
        <html lang="en">
        <body className="bg-gray-100 text-gray-900">
        <main className="container mx-auto p-4">{children}</main>
        </body>
        </html>
    );
}
