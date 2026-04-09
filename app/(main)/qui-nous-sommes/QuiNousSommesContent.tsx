"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; 
import Ensemble from "../components/ensemble";
import Contact from "../components/contact";
import NosExper from "./nos-exp";

 

export default function QuiNousSommesContent() {
  

  return (
    <div className="nos-ref bg-3">
      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">
          Qui sommes nous ? 
        </h1>
      </div>
      <div className="max-width-1082-px realisations mx-auto w-100-perc px-4">
        <br />
        <div className="flex flex-wrap justify-between">
          <div className="col-gt-md-50 col-md-50 col-sm-100 col-xs-100 mx-auto p-3 mb-5">
            <div className="relative">
              <Image
                loading="eager"
                src="/images/esquisse-de-nouvelle-construction.webp"
                alt="GC Structures"
                className="w-95-perc mt-5"
                width={550}
                height={466}
              />
              <div className="absolute ans-exp bg-2 w-186-px height-186-px flex justify-center items-center left--85 bottom--85 rounded-93">
                <span className="clr-1 poppinsbold fz-45 line-height-36 text-center">
                  + 14 ans
                </span>
              </div>
            </div>
          </div>
          <div className="col-gt-md-50 col-md-50 col-sm-100 col-xs-100 p-3 mb-5 flex-center">
            <div className="mb-5">
              <Image
                loading="eager"
                src="/images/Structures.webp"
                alt="GC Structures"
                className=""
                width={389}
                height={86}
              />
              <p className="fz-35 poppinsbold clr-4 mt-5">
                GC Structures à votre service" 
              </p>
              <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">
                 "Bureau d'études techniques spécialisé en ingénierie des structures et génie civil" 
              </p>
              <div className="mt-10">
                <Link href="#" className="bg-2 btn clr-1">
                  Contactez-Nous !
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <Ensemble />
      <NosExper />
      <Contact />
    </div>
  );
}
