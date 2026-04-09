import Image from "next/image";
import Link from "next/link";

interface RealisationsProps {
  content?: {
    title?: string;
    description?: string;
  };
}

export default function Realisations({ content }: RealisationsProps) {
  const title = content?.title || "Réalisations";
  const description = content?.description || "Découvrez nos projets réalisés";

  return (
    <div className="experties px-4 ">
      <div className="max-width-1518-px flex mx-auto flex-col justify-center px-4 mt-8">
        <div className="flex items-end justify-center">
          <Image
            loading="eager"
            className=" "
            src="/images/arrow.webp"
            alt="GC Structures"
            width={120}
            height={96}
          />
          <span className="clr-2 fz-30  poppinsbold mb-3">
            {" "}
            Notre objectif :
          </span>
        </div>
        <p className="fz-20 text-center clr-4 mt-8  ">
          vous offrir un service complet, de la conception à la réalisation,
          avec un haut niveau d&apos;expertise et de fiabilité
        </p>

        <div className="py-24">
          <p className="fz-35 poppinsbold clr-4 text-center mt-5">
            {title}
          </p>{" "}
          <br /> <br />
          <div className="flex-center flex-wrap mt-5 w-100-perc">
            <div className="col-xs-100 col-sm-100 col-md-100 col-gt-md-40 p-3  height-671-px">
              <div className="zoom-in rounded-15 height-100-perc">
                <Image
                  loading="eager"
                  className="w-100-perc height-100-perc zoom-out image"
                  src="/images/batiment-en-beton-symetrique.webp"
                  alt="GC Structures"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="col-xs-100 col-sm-100 col-md-100 col-gt-md-60 px-3  mt-2">
              <div className="flex flex-wrap ">
                <div className="col-xs-100 col-sm-50   col-gt-sm-50 p-3">
                  <div className="zoom-in rounded-15">
                    <Image
                      loading="eager"
                      className="w-100-perc image fit-cover"
                      src="/images/parc-industriel-batiment-d-usine-entrepot.webp"
                      alt="GC Structures"
                      width={100}
                      height={323}
                    />
                  </div>
                </div>
                <div className="col-xs-100 col-sm-50   col-gt-sm-50 p-3">
                  <div className="zoom-in rounded-15">
                    <Image
                      loading="eager"
                      className="w-100-perc image "
                      src="/images/construction-de-batiments-de-nouveaux-gratte-ciel.webp"
                      alt="GC Structures"
                      width={100}
                      height={323}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mb-3">
                <div className="col-xs-100 col-sm-50 col-gt-sm-50 p-3">
                  <div className="zoom-in rounded-15">
                    <Image
                      loading="eager"
                      className="w-100-perc image "
                      src="/images/chantier-de-construction.webp"
                      alt="GC Structures"
                      width={100}
                      height={323}
                    />
                  </div>
                </div>
                <div className="col-xs-100 col-sm-50 col-gt-sm-50 p-3">
                  <div className="zoom-in rounded-15">
                    <Image
                      loading="eager"
                      className="w-100-perc image "
                      src="/images/silo-agricole.webp"
                      alt="GC Structures"
                      width={100}
                      height={323}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-100-perc flex-center mt-5">
          <Link href="#" className=" bg-2 btn clr-1">
            Notre Portfolio !
          </Link>
        </div>
      </div>
    </div>
  );
}
