"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AdminHomePage() {
  useEffect(() => {
    redirect("/admin/demandes-clients");
  }, []);

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-lg text-gray-600">Redirection...</div>
    </div>
  );
}
