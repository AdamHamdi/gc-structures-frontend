"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; 
import Contact from "@/app/(main)/components/contact";

 

export default function EtudesAssistanceContent() {
  

  return (
    <div className="nos-ref bg-3">
      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">
           Études & Assistance 
        </h1>
      </div>
      <div className="max-width-1140-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-3.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3">
          <p className="fz-35 poppinsbold clr-4 mt-5">Études de faisabilité et conception</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Analyse préliminaire des contraintes techniques et des enjeux du projet, propositions de solutions adaptées, chiffrage initial, réalisation d'avant-projets sommaires (APS) et détaillés (APD).</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10">
          <p className="fz-35 poppinsbold clr-4 mt-5">Diagnostic structurel et expertise technique</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Réalisation d'analyses sur site, contrôles non destructifs, modélisation pour évaluer la résistance, l'état à long terme ou les vulnérabilités de la structure, rédaction de rapports d'expertise.</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-4.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-5.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3">
          <p className="fz-35 poppinsbold clr-4 mt-5">Maîtrise d'œuvre et suivi de chantier</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Organisation, coordination technique des intervenants et supervision des opérations de construction ou de réhabilitation, en veillant au respect des délais, du budget, de la qualité et des normes.</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10">
          <p className="fz-35 poppinsbold clr-4 mt-5">Assistance technique auprès de maîtres d'ouvrages et d'entreprises</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Accompagnement personnalisé, interface technique entre la maîtrise d'ouvrage, architectes et entreprises de travaux, appui à la prise de décisions structurantes durant toutes les phases du projet.</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-6.webp"
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
