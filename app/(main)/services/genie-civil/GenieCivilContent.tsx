"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; 
import Contact from "@/app/(main)/components/contact";
 

export default function GenieCivilContent() {
 

  return (
    <div className="nos-ref bg-3">
      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">
           Génie civil 
        </h1>
      </div>
      <div className="max-width-1140-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-11.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3">
          <p className="fz-35 poppinsbold clr-4 mt-5"> Bâtiments: publics, industriels, logements</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36"> Ingénierie et conception de bâtiments pour tout type d'usage : logements collectifs/individuels, bureaux, bâtiments industriels, écoles ou établissements recevant du public. Le bureau assure l'étude de la structure porteuse, le dimensionnement du gros œuvre, et la prise en compte des normes techniques, thermiques, acoustiques et de sécurité. </p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10">
          <p className="fz-35 poppinsbold clr-4 mt-5"> Ouvrages d'art: ponts, passerelles, murs de soutènement </p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36"> Calcul, conception et suivi d'ouvrages de franchissement et de soutènement. Cela inclut la modélisation des charges, l'analyse des contraintes, le choix des procédés constructifs et l'accompagnement à toutes les étapes jusqu'à la réception de l'ouvrage. </p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-12.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-13.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3">
          <p className="fz-35 poppinsbold clr-4 mt-5">Génie urbain: infrastructures routières, réseaux, hydraulique</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">Études et optimisation des réseaux (eau potable, assainissement, voirie, bassins de rétention), prise en compte des enjeux environnementaux et urbains pour la réalisation d'aménagements collectifs : routes, réseaux souterrains, bassins d'orage, etc.</p>
        </div>
      </div>
      <Contact />
    </div>
  );
}
