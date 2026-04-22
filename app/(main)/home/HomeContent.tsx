"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCmsPage } from "@/lib/api";
import Contact from "../components/contact";
import Ensemble from "../components/ensemble";
import Accueil from "./accueil";
import Expertises from "./nos-expertises";
import ContactUs from "./nous-contactez";
import Realisations from "./realisations";
import WhyChooseUs from "./why-choose-us";

export default function HomeContent() {
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCmsPage("home")
      .then((data) => setPageContent(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const sections = pageContent?.sections ?? pageContent;

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          {"GC Structures".split("").map((char, i) => (
            <span key={i} style={{
              fontSize: "clamp(40px, 8vw, 80px)",
              fontWeight: 800,
              color: i % 2 === 0 ? "#1e293b" : "#28a951",
              fontFamily: "Poppins, sans-serif",
              opacity: 0,
              animation: "letterPop 0.4s ease forwards",
              animationDelay: `${i * 0.08}s`,
              display: "inline-block",
              whiteSpace: "pre",
            }}>{char}</span>
          ))}
        </div>
        <span style={{ fontSize: "15px", color: "#94a3b8", letterSpacing: "3px", textTransform: "uppercase", opacity: 0, animation: "letterPop 0.4s ease forwards", animationDelay: `${13 * 0.08 + 0.1}s` }}>
          Chargement...
        </span>
        <style>{`@keyframes letterPop { from { opacity:0; transform:translateY(20px); } 60% { opacity:1; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </div>
    </div>
  );

  return (
    <div>
      <Accueil content={sections?.hero} />
      <div className="bg-3">
        <ContactUs content={sections?.contactUs} />
        <WhyChooseUs content={sections?.whyChooseUs} />
        <Ensemble content={sections?.objective} />
        <Expertises content={sections?.expertises} />
        <Realisations content={sections?.realisations} />
        <Contact />
      </div>
      <Link href="tel:123654789" className="btn-fixed bg-2">
        <svg width="32" height="32" fill="#fff" className="mr-2">
          <use href="/icons/icons.svg#icon-phone"></use>
        </svg>
      </Link>
    </div>
  );
}
