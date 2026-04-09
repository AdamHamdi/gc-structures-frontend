interface AccueilProps {
  content?: {
    title?: string;
    subtitle?: string;
  };
}

export default function Accueil({ content }: AccueilProps) {
  // Valeurs par défaut si le contenu n'est pas disponible
  const title = content?.title || "Concevoir - Calculer - Construire";
  const subtitle = content?.subtitle || "avec précision!";

  return (
    <div className="accueil">
      <div className="text-center line-height-81 fz-55 clr-1 poppinsbold">
        <span className="">{title} </span> <br />
        <span className="bg-2 p-2 rounded-5">{subtitle}</span>
      </div>
      <br />
      <br />
      <div className="flex-center mt-5">
        <button className=" bg-2 btn clr-1">Contactez-Nous !</button>
      </div>
    </div>
  );
}
