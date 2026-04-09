"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; 
import Contact from "@/app/(main)/components/contact";

 

export default function StructuresContent() {
   

  return (
    <div className="nos-ref bg-3">
      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">
          Structures
        </h1>
      </div>
      <div className="max-width-1140-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-7.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3">
          <p className="fz-35 poppinsbold clr-4 mt-5">Béton armé: neuf et réhabilitation</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Conception, calcul et dessin des structures en béton armé, optimisation des sections, vérification de la durabilité, dimensionnement selon les dernières normes Eurocodes. Réhabilitation des bâtis anciens pour les adapter aux exigences actuelles et prolonger leur durée de vie.</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10">
          <p className="fz-35 poppinsbold clr-4 mt-5">Métal: charpentes, assemblages spécifiques</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Études techniques de charpentes et ossatures métalliques, conception des nœuds d'assemblage, vérification de la stabilité globale, maîtrise des spécificités liées à la légèreté, la rapidité de construction et la préfabrication.</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-8.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-9.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3">
          <p className="fz-35 poppinsbold clr-4 mt-5">Bois: structures mixtes et traditionnelles</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Études et optimisation des réseaux (eau potable, assainissement, voirie, bassins de rétention), prise en compte des enjeux environnementaux et urbains pour la réalisation d'aménagements collectifs: routes, réseaux souterrains, bassins d'orage, etc.</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10">
          <p className="fz-35 poppinsbold clr-4 mt-5">Réhabilitation et renforcement d'ouvrages existants</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Diagnostic des pathologies, propositions de solutions de renforcement, chiffrage, suivi des travaux pour garantir sécurité, conformité et pérennité des ouvrages existants.</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-10.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
      </div>
      <Contact />
    </div>
  );
}
