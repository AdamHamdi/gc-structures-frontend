"use client";

import { useEffect, useState } from "react";
import { getCmsPage } from "@/lib/api";
import Contact from "../components/contact";
import Ecoute from "./a-votre-ecoute";

const DEFAULTS: Record<string, string> = {
  ref1: "Centre logistique de stockage et distribution",
  ref2: "Immeuble de bureaux R+8 en béton armé",
  ref3: "Tour tertiaire",
  ref4: "Viaduc routier en béton précontraint",
  ref5: "Silos métalliques et charpente",
  ref6: "Bâtiment béton",
  ref7: "Résidence collective en R+8 avec parking en sous‑sol",
  ref8: "Tour de bureaux de grande hauteur",
  ref9: "Complexe immobilier mixte (logements, commerces, bureaux)",
  ref10: "Résidence tertiaire en construction",
  ref11: "Logements haut de gamme",
  ref12: "Bâtiment industriel",
};

export default function ReferencesContent() {
  const [sections, setSections] = useState<Record<string, { description?: string }>>({});

  useEffect(() => {
    getCmsPage("references")
      .then((data) => setSections(data || {}))
      .catch(() => setSections({}));
  }, []);

  return (
    <div className="nos-ref bg-3">
      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">
          Nos Réalisations
        </h1>
      </div>
      <div className="max-width-1480-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
          const key = `ref${num}`;
          const description = sections[key]?.description || DEFAULTS[key];
          return (
            <div key={num} className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
              <div className="overflow-hidden rounded-25">
                <div className={`bg-img bg-img-${num} flex justify-center p-3`}>
                  <div className="overlay-reas">
                    <p className="m-0 text-center clr-1">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Ecoute />
      <Contact />
    </div>
  );
}
