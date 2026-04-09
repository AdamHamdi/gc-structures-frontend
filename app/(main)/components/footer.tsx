"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"; 

 

interface FooterContent {
  phone?: string;
  email?: string;
}

export default function Footer() {
  const [content, setContent] = useState<FooterContent>({
    phone: "12 365 125 124",
    email: "contact@gc-structures.com",
  });

 

  const handleCookieSettings = () => {
    localStorage.removeItem("cookie-consent");
    window.location.reload();
  };

  return (
    <div className="footer">
      <div className="max-width-1500-px mx-auto flex items-center flex-wrap justify-center gap-20 px-4">
        <div className="mb-5">
          <Image
            loading="eager"
            src="/images/logo.webp"
            alt="logo"
            width={200}
            height={59}
          />
        </div>
        <div className="mb-5">
          <p className="fz-18 poppins-semibold clr-4">Téléphone</p>
          <div className="flex items-center">
            <svg width="20" height="15" fill="#444" className="mr-2">
              <use href="/icons/icons.svg#icon-phone"></use>
            </svg>
            <Link href={`tel:${content.phone?.replace(/\s/g, "")}`} className="fz-15 clr-4">
              {content.phone}
            </Link>
          </div>
        </div>
        <div className="mb-5">
          <p className="fz-18 poppins-semibold clr-4">Email</p>
          <div className="flex items-center">
            <i className="pi pi-envelope clr-4 fz-15 mr-2"></i>
            <Link href={`mailto:${content.email}`} className="fz-15 clr-4">
              {content.email}
            </Link>
          </div>
        </div>
        <div className="mb-5">
          <p className="fz-18 poppins-semibold clr-4">Adresse</p>
          <div className="flex items-center">
            <i className="pi pi-map-marker clr-4 fz-15 mr-2"></i>
            <span className="fz-15 clr-4">123 Rue Example, 75000 Paris, France</span>
          </div>
        </div>
      </div>
      <div className="flex-center flex-wrap items-center mt-10">
        <button onClick={handleCookieSettings} className="fz-17 clr-4 px-3 mb-3 bg-transparent border-0 cursor-pointer hover:underline">
          Cookies
        </button>
        <span className="px-3 mb-3">|</span>
        <Link href="/politique-de-confidentialite" className="fz-17 clr-4 px-3 mb-3">
          Politique de confidentialité
        </Link>
        <span className="px-3 mb-3">|</span>
        <Link href="/mentions-legales" className="fz-17 clr-4 px-3 mb-3">
          Mentions légales
        </Link>
      </div>
    </div>
  );
}
