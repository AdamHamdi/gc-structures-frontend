"use client";

import { apiName, paths } from "@/lib/constants";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { get, put } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import Image from "next/image";
import Link from "next/link";
import { PencilEditButton, EditButton } from "../../components/EditableSection";
import { FaPencilAlt } from "react-icons/fa";

interface SectionContent {
  id?: string;
  title?: string;
  description?: string;
  years?: string;
}

interface PageContent {
  PageName: string;
  sections: {
    [key: string]: SectionContent;
  };
}

export default function QuiNousSommesAdminPage() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        options: { queryParams: { PageName: "qui-nous-sommes" } },
      });

      const response = await restOperation.response;
      const jsonData = await response.body.json();

      if (jsonData && typeof jsonData === "object") {
        setPageContent(jsonData as unknown as PageContent);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du contenu:", error);
      setPageContent({
        PageName: "qui-nous-sommes",
        sections: {
          hero: { title: "Qui sommes nous ?", years: "+ 14 ans" },
          presentation: { title: "Lorem ipsum dolor sit amet, consectetur", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip." },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (sectionId: string, title: string, description: string) => {
    try {
      const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      if (!authToken) {
        throw new Error("Token d'autorisation invalide");
      }

      const payload = {
        PageName: "qui-nous-sommes",
        SectionId: sectionId,
        Content: JSON.stringify({ id: sectionId, title, description }),
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
          sections: { ...prev.sections, [sectionId]: { title, description } },
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

  useEffect(() => {
    if (pageContent?.sections?.presentation) {
      setTempTitle(pageContent.sections.presentation.title || "");
      setTempDescription(pageContent.sections.presentation.description || "");
    }
  }, [pageContent]);

  const handleSavePresentation = async () => {
    setIsLoading(true);
    try {
      await handleSaveSection("presentation", tempTitle, tempDescription);
      setDropdownVisible(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <span>Chargement...</span>
      </div>
    );
  }

  // Valeurs par défaut
  const defaultValues = {
    presentation: {
      title: "Lorem ipsum dolor sit amet, consectetur",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
  };

  const presentation = {
    title: pageContent?.sections?.presentation?.title || defaultValues.presentation.title,
    description: pageContent?.sections?.presentation?.description || defaultValues.presentation.description,
  };

  return (
    <div className="nos-ref bg-3">
      <Toast ref={toast} />

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Qui sommes nous ?</h1>
      </div>

      <div className="max-width-1082-px realisations mx-auto w-100-perc px-4">
        <br />
        <div className="flex flex-wrap justify-between">
          <div className="col-gt-md-50 col-md-50 col-sm-100 col-xs-100 mx-auto p-3 mb-5">
            <div className="relative">
              <Image
                loading="eager"
                src="/images/esquisse-de-nouvelle-construction.webp"
                alt="GC Structures"
                className="w-95-perc mt-5"
                width={550}
                height={466}
              />
              <div className="absolute ans-exp bg-2 w-186-px height-186-px flex justify-center items-center left--85 bottom--85 rounded-93">
                <span className="clr-1 poppinsbold fz-45 line-height-36 text-center">
                  + 14 ans
                </span>
              </div>
            </div>
          </div>
          <div className="col-gt-md-50 col-md-50 col-sm-100 col-xs-100 p-3 mb-5 flex-center">
            <div className="mb-5 relative">
              <PencilEditButton
                title={presentation.title}
                description={presentation.description}
                onSave={(title, description) => handleSaveSection("presentation", title, description)}
              />
              <Image
                loading="eager"
                src="/images/Structures.webp"
                alt="GC Structures"
                width={389}
                height={86}
              />
              <p className="fz-35 poppinsbold clr-4 mt-5">
                {presentation.title}
              </p>
              <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">
                {presentation.description}
              </p>
              <div className="mt-10">
                <Link href="#" className="bg-2 btn clr-1">
                  Contactez-Nous !
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>

      {/* Section Ensemble */}
      <div className="flex-center flex-col py-24 px-4">
        <p className="fz-60 poppinsbold text-center clr-4 mt-5 px-4">
          Construisons ensemble des <br />
          structures solides et durables
        </p>
        <br /><br /><br />
        <p className="fz-17 text-center clr-4">
          De l&apos;étude à la réalisation, notre équipe vous accompagne à chaque
          étape pour garantir la réussite de vos projets
        </p>
        <br /><br /><br />
        <div className="w-fit">
          <button className="bg-2 w-fit btn clr-1">Contactez-Nous !</button>
        </div>
      </div>
    </div>
  );
}
