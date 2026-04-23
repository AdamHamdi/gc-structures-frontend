"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Contact from "@/app/(main)/components/contact";
import { getCmsPage } from "@/lib/api";

const DEFAULTS = {
  section1: { title: "Béton armé: neuf et réhabilitation", description: "Conception, calcul et dessin des structures en béton armé, optimisation des sections, vérification de la durabilité, dimensionnement selon les dernières normes Eurocodes. Réhabilitation des bâtis anciens pour les adapter aux exigences actuelles et prolonger leur durée de vie." },
  section2: { title: "Métal: charpentes, assemblages spécifiques", description: "Études techniques de charpentes et ossatures métalliques, conception des nœuds d'assemblage, vérification de la stabilité globale, maîtrise des spécificités liées à la légèreté, la rapidité de construction et la préfabrication." },
  section3: { title: "Bois: structures mixtes et traditionnelles", description: "Études et optimisation des réseaux (eau potable, assainissement, voirie, bassins de rétention), prise en compte des enjeux environnementaux et urbains pour la réalisation d'aménagements collectifs: routes, réseaux souterrains, bassins d'orage, etc." },
  section4: { title: "Réhabilitation et renforcement d'ouvrages existants", description: "Diagnostic des pathologies, propositions de solutions de renforcement, chiffrage, suivi des travaux pour garantir sécurité, conformité et pérennité des ouvrages existants." },
};

export default function StructuresContent() {
  const [sections, setSections] = useState(DEFAULTS);

  useEffect(() => {
    getCmsPage("structures")
      .then((data) => {
        const s = data?.sections ?? data;
        setSections({
          section1: { title: s?.section1?.title || DEFAULTS.section1.title, description: s?.section1?.description || DEFAULTS.section1.description },
          section2: { title: s?.section2?.title || DEFAULTS.section2.title, description: s?.section2?.description || DEFAULTS.section2.description },
          section3: { title: s?.section3?.title || DEFAULTS.section3.title, description: s?.section3?.description || DEFAULTS.section3.description },
          section4: { title: s?.section4?.title || DEFAULTS.section4.title, description: s?.section4?.description || DEFAULTS.section4.description },
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="nos-ref bg-3">
      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Structures</h1>
      </div>
      <div className="max-width-1140-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-7.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} style={{ width: "auto", height: "auto" }} />
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
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-8.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} style={{ width: "auto", height: "auto" }} />
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-9.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} style={{ width: "auto", height: "auto" }} />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3">
          <p className="fz-35 poppinsbold clr-4 mt-5">{sections.section3.title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{sections.section3.description}</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10">
          <p className="fz-35 poppinsbold clr-4 mt-5">{sections.section4.title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{sections.section4.description}</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-10.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} style={{ width: "auto", height: "auto" }} />
        </div>
      </div>
      <Contact />
    </div>
  );
}
