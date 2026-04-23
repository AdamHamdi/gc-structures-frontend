"use client";

import { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";
import Loader from "../../components/Loader";
import Image from "next/image";
import Link from "next/link";
import { PencilEditButton } from "../../components/EditableSection";
import { getCmsPage, updateCmsSection } from "@/lib/api";

interface SectionContent { id?: string; title?: string; description?: string; }
interface PageContent { PageName: string; sections: { [key: string]: SectionContent }; }

const PAGE = "qui-nous-sommes";
const DEFAULTS = {
  presentation: {
    title: "GC Structures à votre service",
    description: "Bureau d'études techniques spécialisé en ingénierie des structures et génie civil",
  },
};

export default function QuiNousSommesAdminPage() {
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
      setPageContent({ PageName: PAGE, sections: { hero: { title: "Qui sommes nous ?", years: "+ 14 ans" } as any, presentation: DEFAULTS.presentation } });
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

  const presentationData = pageContent?.sections?.presentation ?? (pageContent as any)?.presentation;
  const presentation = {
    title: presentationData?.title || DEFAULTS.presentation.title,
    description: presentationData?.description || DEFAULTS.presentation.description,
  };

  return (
    <div className="nos-ref bg-3">

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Qui sommes nous ?</h1>
      </div>
      <div className="max-width-1082-px realisations mx-auto w-100-perc px-4">
        <br />
        <div className="flex flex-wrap justify-between">
          <div className="col-gt-md-50 col-md-50 col-sm-100 col-xs-100 mx-auto p-3 mb-5">
            <div className="relative">
              <Image loading="eager" src="/images/esquisse-de-nouvelle-construction.webp" style={{ width: "auto", height: "auto" }} alt="GC Structures" className="w-95-perc mt-5" width={550} height={466} />
              <div className="absolute ans-exp bg-2 w-186-px height-186-px flex justify-center items-center left--85 bottom--85 rounded-93">
                <span className="clr-1 poppinsbold fz-45 line-height-36 text-center">+ 14 ans</span>
              </div>
            </div>
          </div>
          <div className="col-gt-md-50 col-md-50 col-sm-100 col-xs-100 p-3 mb-5 flex-center">
            <div className="mb-5 relative">
              <PencilEditButton
                title={presentation.title}
                description={presentation.description}
                onSave={(t, d) => handleSaveSection("presentation", t, d)}
              />
              <Image loading="eager" src="/images/Structures.webp" alt="GC Structures" style={{ width: "auto", height: "auto" }} width={389} height={86}   />
              <p className="fz-35 poppinsbold clr-4 mt-5">{presentation.title}</p>
              <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{presentation.description}</p>
              <div className="mt-10">
                <Link href="#" className="bg-2 btn clr-1">Contactez-Nous !</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-center flex-col py-24 px-4">
        <p className="fz-60 poppinsbold text-center clr-4 mt-5 px-4">Construisons ensemble des <br />structures solides et durables</p>
        <br /><br /><br />
        <p className="fz-17 text-center clr-4">De l&apos;étude à la réalisation, notre équipe vous accompagne à chaque étape pour garantir la réussite de vos projets</p>
        <br /><br /><br />
        <div className="w-fit"><button className="bg-2 w-fit btn clr-1">Contactez-Nous !</button></div>
      </div>
    </div>
  );
}