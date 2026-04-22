"use client";

import { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";
import Loader from "../../components/Loader";
import Image from "next/image";
import { PencilEditButton } from "../../components/EditableSection";
import { getCmsPage, updateCmsSection } from "@/lib/api";

interface SectionContent { id?: string; title?: string; description?: string; }
interface PageContent { PageName: string; sections: { [key: string]: SectionContent }; }

const PAGE = "structures";
const DEFAULTS = {
  section1: { title: "Béton armé (neuf et réhabilitation)", description: "Conception, calcul et dessin des structures en béton armé, optimisation des sections, vérification de la durabilité, dimensionnement selon les dernières normes Eurocodes. Réhabilitation des bâtis anciens pour les adapter aux exigences actuelles et prolonger leur durée de vie." },
  section2: { title: "Métal (charpentes, assemblages spécifiques)", description: "Études techniques de charpentes et ossatures métalliques, conception des nœuds d'assemblage, vérification de la stabilité globale, maîtrise des spécificités liées à la légèreté, la rapidité de construction et la préfabrication." },
  section3: { title: "Bois (structures mixtes et traditionnelles)", description: "Études et optimisation des réseaux (eau potable, assainissement, voirie, bassins de rétention), prise en compte des enjeux environnementaux et urbains pour la réalisation d'aménagements collectifs: routes, réseaux souterrains, bassins d'orage, etc." },
  section4: { title: "Réhabilitation et renforcement d'ouvrages existants", description: "Diagnostic des pathologies, propositions de solutions de renforcement, chiffrage, suivi des travaux pour garantir sécurité, conformité et pérennité des ouvrages existants." },
};

export default function StructuresAdminPage() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => { fetchPageContent(); }, []);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const data = await getCmsPage(PAGE);
      setPageContent(data);
    } catch {
      setPageContent({ PageName: PAGE, sections: DEFAULTS });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (sectionId: string, title: string, description: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      await updateCmsSection(token, PAGE, sectionId, { id: sectionId, title, description });
      setPageContent((prev) => prev ? { ...prev, sections: { ...prev.sections, [sectionId]: { title, description } } } : prev);
      toast.show("success", "Succès", "Section mise à jour !");
    } catch {
      toast.show("error", "Erreur", "Échec de la sauvegarde.");
    }
  };

  if (loading) return <Loader inline />;

  const s = (id: keyof typeof DEFAULTS) => ({
    title: pageContent?.sections?.[id]?.title || DEFAULTS[id].title,
    description: pageContent?.sections?.[id]?.description || DEFAULTS[id].description,
  });

  return (
    <div className="nos-ref bg-3">

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Structures</h1>
      </div>
      <div className="max-width-1140-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-7.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 relative">
          <PencilEditButton title={s("section1").title} description={s("section1").description} onSave={(t, d) => handleSaveSection("section1", t, d)} />
          <p className="fz-35 poppinsbold clr-4 mt-5">{s("section1").title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{s("section1").description}</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10 relative">
          <PencilEditButton title={s("section2").title} description={s("section2").description} onSave={(t, d) => handleSaveSection("section2", t, d)} />
          <p className="fz-35 poppinsbold clr-4 mt-5">{s("section2").title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{s("section2").description}</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-8.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} />
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-9.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 relative">
          <PencilEditButton title={s("section3").title} description={s("section3").description} onSave={(t, d) => handleSaveSection("section3", t, d)} />
          <p className="fz-35 poppinsbold clr-4 mt-5">{s("section3").title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{s("section3").description}</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10 relative">
          <PencilEditButton title={s("section4").title} description={s("section4").description} onSave={(t, d) => handleSaveSection("section4", t, d)} />
          <p className="fz-35 poppinsbold clr-4 mt-5">{s("section4").title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{s("section4").description}</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-10.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} />
        </div>
      </div>
    </div>
  );
}