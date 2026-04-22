"use client";

import { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";
import Loader from "../../components/Loader";
import Image from "next/image";
import { PencilEditButton } from "../../components/EditableSection";
import { getCmsPage, updateCmsSection } from "@/lib/api";

interface SectionContent { id?: string; title?: string; description?: string; }
interface PageContent { PageName: string; sections: { [key: string]: SectionContent }; }

const PAGE = "genie-civil";
const DEFAULTS = {
  section1: { title: "Bâtiments (publics, industriels, logements)", description: "Ingénierie et conception de bâtiments pour tout type d'usage : logements collectifs/individuels, bureaux, bâtiments industriels, écoles ou établissements recevant du public. Le bureau assure l'étude de la structure porteuse, le dimensionnement du gros œuvre, et la prise en compte des normes techniques, thermiques, acoustiques et de sécurité." },
  section2: { title: "Ouvrages d'art (ponts, passerelles, murs de soutènement)", description: "Calcul, conception et suivi d'ouvrages de franchissement et de soutènement. Cela inclut la modélisation des charges, l'analyse des contraintes, le choix des procédés constructifs et l'accompagnement à toutes les étapes jusqu'à la réception de l'ouvrage." },
  section3: { title: "Génie urbain (infrastructures routières, réseaux, hydraulique)", description: "Études et optimisation des réseaux (eau potable, assainissement, voirie, bassins de rétention), prise en compte des enjeux environnementaux et urbains pour la réalisation d'aménagements collectifs : routes, réseaux souterrains, bassins d'orage, etc." },
};

export default function GenieCivilAdminPage() {
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

  const s1 = { title: pageContent?.sections?.section1?.title || DEFAULTS.section1.title, description: pageContent?.sections?.section1?.description || DEFAULTS.section1.description };
  const s2 = { title: pageContent?.sections?.section2?.title || DEFAULTS.section2.title, description: pageContent?.sections?.section2?.description || DEFAULTS.section2.description };
  const s3 = { title: pageContent?.sections?.section3?.title || DEFAULTS.section3.title, description: pageContent?.sections?.section3?.description || DEFAULTS.section3.description };

  return (
    <div className="nos-ref bg-3">

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Génie civil</h1>
      </div>
      <div className="max-width-1140-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-11.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 relative">
          <PencilEditButton title={s1.title} description={s1.description} onSave={(t, d) => handleSaveSection("section1", t, d)} />
          <p className="fz-35 poppinsbold clr-4 mt-5">{s1.title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{s1.description}</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10 relative">
          <PencilEditButton title={s2.title} description={s2.description} onSave={(t, d) => handleSaveSection("section2", t, d)} />
          <p className="fz-35 poppinsbold clr-4 mt-5">{s2.title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{s2.description}</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-12.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} />
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-13.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 relative">
          <PencilEditButton title={s3.title} description={s3.description} onSave={(t, d) => handleSaveSection("section3", t, d)} />
          <p className="fz-35 poppinsbold clr-4 mt-5">{s3.title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{s3.description}</p>
        </div>
      </div>
    </div>
  );
}