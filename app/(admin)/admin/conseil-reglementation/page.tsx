"use client";

import { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";
import Loader from "../../components/Loader";
import Image from "next/image";
import { PencilEditButton } from "../../components/EditableSection";
import { getCmsPage, updateCmsSection } from "@/lib/api";

interface SectionContent { id?: string; title?: string; description?: string; }
interface PageContent { PageName: string; sections: { [key: string]: SectionContent }; }

const PAGE = "conseil-reglementation";
const DEFAULTS = {
  section1: { title: "Conseil technique", description: "Conseil technique sur les choix structuraux, matériaux, procédés innovants. Préconisations sur les matériaux et procédés adaptés à chaque situation (innovation, durabilité, coût, environnement), promotion de techniques constructives modernes ou de réemploi." },
  section2: { title: "Assistance", description: "Assistance pour conformité réglementaire (DTU, Eurocodes, sécurité incendie). Surveillance active de l'évolution normative, vérification systématique de la conformité des études et des ouvrages avec la réglementation en vigueur (Eurocodes, DTU, sécurité incendie, accessibilité, thermique)." },
};

export default function ConseilReglementationAdminPage() {
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
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Conseil &amp; Réglementation</h1>
      </div>
      <div className="max-width-1140-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction1.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 p-3 mb-3 relative">
          <PencilEditButton title={s("section1").title} description={s("section1").description} onSave={(t, d) => handleSaveSection("section1", t, d)} />
          <p className="fz-35 poppinsbold clr-4 mt-5">{s("section1").title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{s("section1").description}</p>
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 p-3 mb-3 mt-5 relative">
          <PencilEditButton title={s("section2").title} description={s("section2").description} onSave={(t, d) => handleSaveSection("section2", t, d)} />
          <p className="fz-35 poppinsbold clr-4 mt-5">{s("section2").title}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{s("section2").description}</p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-5">
          <Image loading="eager" src="/images/esquisse-de-nouvelle-construction-2.webp" alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} />
        </div>
      </div>
    </div>
  );
}