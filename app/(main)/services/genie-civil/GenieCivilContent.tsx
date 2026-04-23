"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Contact from "@/app/(main)/components/contact";
import { getCmsPage } from "@/lib/api";

const DEFAULTS = {
  section1: { title: "Bâtiments: publics, industriels, logements", description: "Ingénierie et conception de bâtiments pour tout type d'usage : logements collectifs/individuels, bureaux, bâtiments industriels, écoles ou établissements recevant du public. Le bureau assure l'étude de la structure porteuse, le dimensionnement du gros œuvre, et la prise en compte des normes techniques, thermiques, acoustiques et de sécurité." },
  section2: { title: "Ouvrages d'art: ponts, passerelles, murs de soutènement", description: "Calcul, conception et suivi d'ouvrages de franchissement et de soutènement. Cela inclut la modélisation des charges, l'analyse des contraintes, le choix des procédés constructifs et l'accompagnement à toutes les étapes jusqu'à la réception de l'ouvrage." },
  section3: { title: "Génie urbain: infrastructures routières, réseaux, hydraulique", description: "Études et optimisation des réseaux (eau potable, assainissement, voirie, bassins de rétention), prise en compte des enjeux environnementaux et urbains pour la réalisation d'aménagements collectifs : routes, réseaux souterrains, bassins d'orage, etc." },
};

export default function GenieCivilContent() {
  const [sections, setSections] = useState(DEFAULTS);

  useEffect(() => {
    getCmsPage("genie-civil")
      .then((data) => {
        const s = data?.sections ?? data;
        setSections({
          section1: { title: s?.section1?.title || DEFAULTS.section1.title, description: s?.section1?.description || DEFAULTS.section1.description },
          section2: { title: s?.section2?.title || DEFAULTS.section2.title, description: s?.section2?.description || DEFAULTS.section2.description },
          section3: { title: s?.section3?.title || DEFAULTS.section3.title, description: s?.section3?.description || DEFAULTS.section3.description },
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="nos-ref bg-3">
      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Génie civil</h1>
      </div>
      <div className="max-width-1140-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-11.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} style={{ width: "auto", height: "auto" }} />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3">
          <p className="fz-35 poppinsbold clr-4 mt-5">{sections.section1.title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{sections.section1.description}</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10">
          <p className="fz-35 poppinsbold clr-4 mt-5">{sections.section2.title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{sections.section2.description}</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-12.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} style={{ width: "auto", height: "auto" }} />
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-13.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} style={{ width: "auto", height: "auto" }} />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3">
          <p className="fz-35 poppinsbold clr-4 mt-5">{sections.section3.title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{sections.section3.description}</p>
        </div>
      </div>
      <Contact />
    </div>
  );
}
