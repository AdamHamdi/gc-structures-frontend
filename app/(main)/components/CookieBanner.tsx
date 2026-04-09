"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleRefuse = () => {
    localStorage.setItem("cookie-consent", "refused");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <div className="cookie-text">
          <p className="fz-17 clr-4">
            Nous utilisons des cookies pour améliorer votre expérience sur notre site.
            En continuant à naviguer, vous acceptez notre utilisation des cookies.
          </p>
          <Link href="/politique-de-confidentialite" className="cookie-link fz-14">
            En savoir plus
          </Link>
        </div>
        <div className="cookie-buttons">
          <button onClick={handleRefuse} className="cookie-btn cookie-btn-refuse">
            Refuser
          </button>
          <button onClick={handleAccept} className="cookie-btn cookie-btn-accept">
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
