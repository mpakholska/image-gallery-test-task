"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { exchangeCodeForToken } from "@/services/authService";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            exchangeCodeForToken(code).then(() => {
                router.push("/");
            });
        }
    }, []);

    return <p>Authenticating...</p>;
}
