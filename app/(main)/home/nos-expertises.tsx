import Image from "next/image";

interface ExpertiseItem {
  name: string;
  number: string;
  points: string[];
}

interface ExpertisesProps {
  content?: {
    title?: string;
    items?: ExpertiseItem[];
  };
}

const defaultItems: ExpertiseItem[] = [
  {
    name: "Conseil en amont",
    number: "01",
    points: [
      "Études de faisabilité adaptées à vos besoins",
      "Pré-dimensionnement pour anticiper les solutions techniques",
      "Assistance à maîtrise d'ouvrage (AMOA) pour sécuriser vos décisions"
    ]
  },
  {
    name: "Conception et Maîtrise d'œuvre",
    number: "02",
    points: [
      "Études de structures béton fiables et performantes",
      "Conception et optimisation de charpentes métalliques et bois",
      "Réalisation de plans généraux pour une vision claire du projet"
    ]
  },
  {
    name: "Réalisation et Suivi d'exécution",
    number: "03",
    points: [
      "Calculs précis des ouvrages béton",
      "Études sismiques et dynamiques pour garantir la sécurité",
      "Plans détaillés de coffrage et d'armatures",
      "Élaboration des dossiers de consultation des entreprises (DCE)",
      "Suivi de chantier pour un accompagnement de A à Z"
    ]
  }
];

const images = [
  "/images/gros-plan-hommes-regarder-plan.webp",
  "/images/vue-laterale-de-l-homme-avec-blueprint.webp",
  "/images/femme-travaillant-avec-une-grande-regle-et-un-stylo-sur-la-table.webp"
];

export default function Expertises({ content }: ExpertisesProps) {
  const title = content?.title || "Nos expertises pour vos projets";
  const items = content?.items || defaultItems;

  return (
    <div className="experties ">
      <div className="max-width-1518-px flex mx-auto flex-col justify-center ">
        <p className="fz-35 poppinsbold text-center clr-4 mt-5">
          {title}
        </p>
        <br /> <br />
        <div className="flex  flex-wrap mt-5 w-100-perc">
          {items.map((item, index) => (
            <div key={index} className="col-xs-100 col-sm-50 col-md-50 col-gt-md-33 px-3 mb-4">
              <div className="bg-1 rounded-25 w-100-perc p-5 min-height-707-px">
                <div className="zoom-in rounded-15">
                  <Image
                    loading="eager"
                    className="w-100-perc zoom-out image"
                    src={images[index % images.length]}
                    alt="GC Structures"
                    width={100}
                    height={299}
                  />
                </div>
                <div className=" ">
                  <div className="flex align-center mt-5 ">
                    <div className="height-34-px bg-6 w-34-px mr-3 flex-center rounded-17  ">
                      <span className="clr-2 fz-20 poppinsbold">{item.number}</span>
                    </div>

                    <span className="clr-4  fz-20 poppinsbold pt-1">
                      {item.name}
                    </span>
                  </div>
                  <ul className="fz-17 line-height-36 mt-5 ">
                    {item.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="fz-17 clr-4">
                        <strong>•</strong> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
