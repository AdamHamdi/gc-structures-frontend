"use client";

import { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";
import Loader from "../../components/Loader";
import { PencilEditSingleButton } from "../../components/EditableSection";
import { getCmsPage, updateCmsSection } from "@/lib/api";

interface SectionContent { id?: string; description?: string; }
interface PageContent { PageName: string; sections: { [key: string]: SectionContent }; }

const PAGE = "references";

export default function ReferencesAdminPage() {
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
      const sections: { [key: string]: SectionContent } = {};
      for (let i = 1; i <= 12; i++) sections[`ref${i}`] = { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" };
      setPageContent({ PageName: PAGE, sections });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (sectionId: string, description: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      await updateCmsSection(token, PAGE, sectionId, { id: sectionId, description });
      setPageContent((prev) => prev ? { ...prev, sections: { ...prev.sections, [sectionId]: { description } } } : prev);
      toast.show("success", "Succès", "Section mise à jour !");
    } catch {
      toast.show("error", "Erreur", "Échec de la sauvegarde.");
    }
  };

  if (loading) return <Loader inline />;

  return (
    <div className="nos-ref bg-3">

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Nos Réalisations</h1>
      </div>
      <div className="max-width-1480-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((num) => {
          const sectionId = `ref${num}`;
          const section = pageContent?.sections?.[sectionId] || {};
          return (
            <div key={num} className="col-md-50 col-lg-33 col-gt-lg-33 col-sm-50 col-xs-100 p-3 mb-3">
              <div className="overflow-hidden rounded-25 relative">
                <PencilEditSingleButton
                  value={section.description || "Lorem ipsum dolor sit amet, consectetur adipiscing"}
                  label="Description"
                  onSave={(description) => handleSaveSection(sectionId, description)}
                />
                <div className={`bg-img bg-img-${num} flex justify-center p-3`}>
                  <div className="overlay-reas">
                    <p className="m-0 text-center clr-1">{section.description || "Lorem ipsum dolor sit amet, consectetur adipiscing"}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-center flex-col py-24 px-4">
        <p className="fz-35 poppinsbold text-center clr-4 mt-5">À votre écoute pour vos projets</p>
        <p className="fz-17 text-center clr-4 mt-5 max-width-800-px">Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos projets de construction.</p>
        <div className="mt-10"><button className="bg-2 btn clr-1">Contactez-Nous !</button></div>
      </div>
    </div>
  );
}