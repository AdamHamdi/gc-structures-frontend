interface WhyChooseUsItem {
  name: string;
  description: string;
}

interface WhyChooseUsProps {
  content?: {
    title?: string;
    items?: WhyChooseUsItem[];
  };
}

const defaultItems: WhyChooseUsItem[] = [
  {
    name: "Expertise et polyvalence",
    description: "Notre bureau d'études réunit des ingénieurs et experts spécialisés dans tous les domaines du génie civil et des structures (béton, acier, bois, ouvrages d'art, génie urbain). Nous intervenons sur des projets variés, du bâtiment à la grande infrastructure, avec rigueur et méthode"
  },
  {
    name: "Approche sur mesure et innovation",
    description: "Chaque projet est unique, c'est pourquoi nous proposons des solutions adaptées, optimisées et innovantes, intégrant les dernières normes réglementaires (Eurocodes, DTU, sécurité incendie) et les meilleures pratiques environnementales pour garantir durabilité et performance."
  },
  {
    name: "Qualité, sécurité et conformité",
    description: "GC Structures s'engage à respecter les exigences de qualité les plus élevées, assurer la sécurité structurelle et prendre en compte toutes les contraintes réglementaires afin d'offrir des ouvrages pérennes et conformes."
  },
  {
    name: "Accompagnement complet et réactif",
    description: "De l'étude de faisabilité à la réception finale, nous accompagnons nos clients à chaque étape avec transparence, disponibilité et un suivi attentif, garantissant délais respectés et maîtrise des coûts."
  }
];

const icons = ["icon-check-square", "icon-check-list", "icon-building", "icon-calendar-check"];

export default function WhyChooseUs({ content }: WhyChooseUsProps) {
  const title = content?.title || "Pour quoi nous choisir ?";
  const items = content?.items || defaultItems;

  return (
    <div className="why-choose-us ">
      <div className="max-width-1518-px flex mx-auto flex-col justify-center px-4">
        <p className="fz-35 poppinsbold clr-4 text-center mt-5">
          {title}
        </p>{" "}
        <br /> <br />
        <div className="flex  flex-wrap mt-5 w-100-perc">
          {items.map((item, index) => (
            <div key={index} className="col-xs-100 col-sm-50 col-md-50 col-lg-33 col-xl-33 col-xxl-25 px-2 mb-4">
              <div className="bg-1 rounded-25 w-100-perc p-8 min-height-588-px z-in">
                <div className="flex-center flex-col ">
                  <div className="  relative">
                    <svg width="40" height="40" className="relative z-index-1">
                      <use
                        href={`/icons/icons.svg#${icons[index % icons.length]}`}
                        fill="#28a951"
                      ></use>
                    </svg>
                    <div className="height-34-px bg-6 w-34-px absolute rounded-17 z-index-0 top--10 right--23"></div>
                  </div>
                  <p className="mt-8 fz-20 clr-4 poppinsbold text-center">
                    {item.name}
                  </p>
                  <p className="fz-17 clr-4 line-height-36 mt-8 text-center">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
