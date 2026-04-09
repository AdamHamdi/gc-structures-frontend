"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { aws_config } from "@/lib/aws-exports";
import "@aws-amplify/ui-react/styles.css";
import "primeicons/primeicons.css";
import "@/styles/globals.scss";
import "@/styles/tailwind.css";
import SideBar from "./components/sidebar";
import { Suspense } from "react"; 
Amplify.configure(aws_config, { ssr: false });
import "./style.scss"

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-lg text-gray-600">Chargement...</div>
    </div>
  );
}

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
      <body className="admin" > 
    <Authenticator hideSignUp={true}>
      <Suspense fallback={<Loader />}>
        <div className="min-h-screen bg-white admin-container overflow-x-hidden">
          <SideBar />
          <main className="lg:ml-56 w-full overflow-x-hidden">
            {children}
          </main>
        </div>
      </Suspense>
    </Authenticator>
    </body>
    </html>
  );
}
