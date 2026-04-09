"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
 
import Contact from "../components/contact";
import Ensemble from "../components/ensemble";
import Accueil from "./accueil";
import Expertises from "./nos-expertises";
import ContactUs from "./nous-contactez";
import Realisations from "./realisations";
import WhyChooseUs from "./why-choose-us";



export default function HomeContent() {
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

 

  const sections = pageContent?.sections;

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
        <svg width="32" height="32" fill="#fff" className=" mr-2">
          <use href="/icons/icons.svg#icon-phone"></use>
        </svg>
      </Link>
    </div>
  );
}
