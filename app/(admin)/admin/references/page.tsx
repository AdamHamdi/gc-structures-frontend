"use client";

import { apiName, paths } from "@/lib/constants";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { get, put } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { PencilEditSingleButton } from "../../components/EditableSection";

interface SectionContent {
  id?: string;
  title?: string;
  description?: string;
}

interface PageContent {
  PageName: string;
  sections: {
    [key: string]: SectionContent;
  };
}

export default function ReferencesAdminPage() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const restOperation = get({
        apiName: apiName,
        path: paths.cms_page_content,
        options: { queryParams: { PageName: "references" } },
      });

      const response = await restOperation.response;
      const jsonData = await response.body.json();

      if (jsonData && typeof jsonData === "object") {
        setPageContent(jsonData as unknown as PageContent);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du contenu:", error);
      setPageContent({
        PageName: "references",
        sections: {
          ref1: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref2: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref3: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref4: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref5: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref6: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref7: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref8: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref9: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref10: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref11: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
          ref12: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (sectionId: string, description: string) => {
    try {
      const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      if (!authToken) {
        throw new Error("Token d'autorisation invalide");
      }

      const payload = {
        PageName: "references",
        SectionId: sectionId,
        Content: JSON.stringify({ id: sectionId, description }),
      };

      const restOperation = put({
        apiName: apiName,
        path: paths.cms_section_content,
        options: {
          headers: { Authorization: authToken },
          body: payload,
        },
      });

      await restOperation.response;

      setPageContent((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          sections: { ...prev.sections, [sectionId]: { description } },
        };
      });

      toast.current?.show({
        severity: "success",
        summary: "Succès",
        detail: "Section mise à jour avec succès !",
        life: 3000,
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.current?.show({
        severity: "error",
        summary: "Erreur",
        detail: "Échec de la sauvegarde.",
        life: 3000,
      });
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <span>Chargement...</span>
      </div>
    );
  }

  const references = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="nos-ref bg-3">
      <Toast ref={toast} />

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Nos Réalisations</h1>
      </div>

      <div className="max-width-1480-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        {references.map((num) => {
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
                    <p className="m-0 text-center clr-1">
                      {section.description || "Lorem ipsum dolor sit amet, consectetur adipiscing"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section A votre écoute */}
      <div className="flex-center flex-col py-24 px-4">
        <p className="fz-35 poppinsbold text-center clr-4 mt-5">
          À votre écoute pour vos projets
        </p>
        <p className="fz-17 text-center clr-4 mt-5 max-width-800-px">
          Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos projets de construction.
        </p>
        <div className="mt-10">
          <button className="bg-2 btn clr-1">Contactez-Nous !</button>
        </div>
      </div>
    </div>
  );
}
