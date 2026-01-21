"use client";

import { useLoading } from "@/context/LoadingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CameraNav from "@/components/CameraNav";
import { useEffect, useState } from "react";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const { loading } = useLoading();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {!loading && <Navbar />}
            <main id="main-content">
                {children}
            </main>
            {!loading && (
                <>
                    <Footer />
                    <CameraNav />
                </>
            )}
        </>
    );
}
