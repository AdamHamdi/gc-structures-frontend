"use client";

import { useEffect, useState } from "react"; 
import Contact from "../components/contact";
import Ecoute from "./a-votre-ecoute";

 

interface RealisationItem {
  description?: string;
}

export default function ReferencesContent() {
   
  return (
    <div className="nos-ref bg-3">
      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">
          Nos Réalisations
        </h1>
      </div>
      <div className="max-width-1480-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
     
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-1 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                    Centre logistique de stockage et distribution
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-2 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                   Immeuble de bureaux R+8 en béton armé
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-3 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                   Tour tertiaire
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-4 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                  Viaduc routier en béton précontraint
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-5 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                  Silos métalliques et charpente
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-6 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                  Bâtiment béton
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-7 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                 Résidence collective en R+8 avec parking en sous‑sol
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-8 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                Tour de bureaux de grande hauteur
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-9 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                  Complexe immobilier mixte (logements, commerces, bureaux)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-10 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                 Résidence tertiaire en costruction
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-11 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                  Logements haut de gamme
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div   className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
            <div className="overflow-hidden rounded-25">
              <div className="bg-img bg-img-12 flex justify-center p-3">
                <div className="overlay-reas">
                  <p className="m-0 text-center clr-1">
                  Bâtiment industriel
                  </p>
                </div>
              </div>
            </div>
          </div>
       
      </div>
      <Ecoute />
      <Contact />
    </div>
  );
}
