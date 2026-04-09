import Link from "next/link";

interface EnsembleProps {
  content?: {
    title?: string;
    description?: string;
  };
}

export default function Ensemble({ content }: EnsembleProps) {
  const title = content?.title || "Construisons ensemble des structures solides et durables";
  const description = content?.description || "De l'étude à la réalisation, notre équipe vous accompagne à chaque étape pour garantir la réussite de vos projets";

  return (
    <div className="flex-center flex-col py-24 px-4">
      <p className="fz-60 poppinsbold text-center clr-4 mt-5 px-4">
        {title}
      </p>
      <br />
      <br />
      <br />
      <p className="fz-17 text-center clr-4">
        {description}
      </p>
      <br />
      <br />
      <br />
      <div className="w-fit">
        <Link href="#" className=" bg-2 w-fit btn clr-1">
          Contactez-Nous !
        </Link>
      </div>
    </div>
  );
}
