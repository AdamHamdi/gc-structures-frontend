"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getMe } from "@/lib/api";
import SideBar from "./components/sidebar";
import Loader from "./components/Loader";
import { ToastProvider } from "./components/Toast";
import { Suspense } from "react";
import "primeicons/primeicons.css";
import "@/styles/globals.scss";
import "./style.scss";


export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecked(true);
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    getMe(token)
      .then(() => setChecked(true))
      .catch(() => {
        localStorage.removeItem("token");
        router.replace("/admin/login");
      });
  }, [isLoginPage]);

  if (!checked) return <Loader />;

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <ToastProvider>
      <div className="admin">
        <Suspense fallback={<Loader inline />}>
          <div className="min-h-screen bg-white admin-container overflow-x-hidden">
            <SideBar />
            <main className="lg:ml-70 w-full overflow-x-hidden pt-4">
              {children}
            </main>
          </div>
        </Suspense>
      </div>
    </ToastProvider>
  );
}