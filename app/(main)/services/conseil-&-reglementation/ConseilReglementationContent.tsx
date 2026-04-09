"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; 
import Contact from "@/app/(main)/components/contact";

 

export default function ConseilReglementationContent() {
 

  return (
    <div className="nos-ref bg-3">
      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">
          Conseil & Réglementation
        </h1>
      </div>
      <div className="max-width-1140-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction1.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 p-3 mb-3">
          <p className="fz-35 poppinsbold clr-4 mt-5">Conseil technique</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Conseil technique sur les choix structuraux, matériaux, procédés innovants Préconisations sur les matériaux et procédés adaptés à chaque situation (innovation, durabilité, coût, environnement), promotion de techniques constructives modernes ou de réemploi.</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 p-3 mb-3 mt-5">
          <p className="fz-35 poppinsbold clr-4 mt-5">Assistance technique</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Nous vous accompagnons pour garantir la conformité réglementaire de vos projets à chaque étape. Notre équipe assure une veille normative continue et vérifie systématiquement la conformité des études et des ouvrages avec la réglementation en vigueur (DTU, Eurocodes, Sécurité incendie, Accessibilité, Réglementation thermique).</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-5">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-2.webp"
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
