"use client";

import Image from "next/image";
import Link from "next/link";
import Contact from "../components/contact";
import Ensemble from "../components/ensemble";
import NosExper from "./nos-exp";
import { useEffect, useState } from "react";
import { getCmsPage } from "@/lib/api";

const DEFAULT_TITLE = "GC Structures à votre service";
const DEFAULT_DESCRIPTION = "Bureau d'études techniques spécialisé en ingénierie des structures et génie civil";

// même valeurs que dans l'admin — si la section n'existe pas encore en base, on affiche ces defaults

export default function QuiNousSommesContent() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);

  useEffect(() => {
    getCmsPage("qui-nous-sommes")
      .then((data) => {
        console.log("CMS qui-nous-sommes:", JSON.stringify(data));
        const section = data?.sections?.presentation ?? data?.presentation;
        if (section?.title) setTitle(section.title);
        if (section?.description) setDescription(section.description);
      })
      .catch((err) => { console.error("CMS error:", err); });
  }, []);

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
          <div className="col-gt-md-50 col-md-50 col-sm-100 col-xs-100 p-5 mb-5 flex-center">
            <div className="mb-5">
              <Image
                loading="eager"
                src="/images/Structures.webp"
                alt="GC Structures"
                className=""
                width={389}
                height={86}
                style={{ height: "auto" }}
              />
              <p className="fz-35 poppinsbold clr-4 mt-5">{title}</p>
              <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{description}</p>
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
