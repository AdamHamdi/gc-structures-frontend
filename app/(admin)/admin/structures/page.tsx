"use client";

import { apiName, paths } from "@/lib/constants";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { get, put } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import Image from "next/image";
import { PencilEditButton } from "../../components/EditableSection";

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

export default function StructuresAdminPage() {
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
        options: { queryParams: { PageName: "structures" } },
      });

      const response = await restOperation.response;
      const jsonData = await response.body.json();

      if (jsonData && typeof jsonData === "object") {
        setPageContent(jsonData as unknown as PageContent);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du contenu:", error);
      setPageContent({
        PageName: "structures",
        sections: {
          section1: { title: "Béton armé (neuf et réhabilitation)", description: "Conception, calcul et dessin des structures en béton armé, optimisation des sections, vérification de la durabilité, dimensionnement selon les dernières normes Eurocodes. Réhabilitation des bâtis anciens pour les adapter aux exigences actuelles et prolonger leur durée de vie." },
          section2: { title: "Métal (charpentes, assemblages spécifiques)", description: "Études techniques de charpentes et ossatures métalliques, conception des nœuds d'assemblage, vérification de la stabilité globale, maîtrise des spécificités liées à la légèreté, la rapidité de construction et la préfabrication." },
          section3: { title: "Bois (structures mixtes et traditionnelles)", description: "Études et optimisation des réseaux (eau potable, assainissement, voirie, bassins de rétention), prise en compte des enjeux environnementaux et urbains pour la réalisation d'aménagements collectifs: routes, réseaux souterrains, bassins d'orage, etc." },
          section4: { title: "Réhabilitation et renforcement d'ouvrages existants", description: "Diagnostic des pathologies, propositions de solutions de renforcement, chiffrage, suivi des travaux pour garantir sécurité, conformité et pérennité des ouvrages existants." },
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
        PageName: "structures",
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

  if (loading) {
    return (
      <div className="loader">
        <span>Chargement...</span>
      </div>
    );
  }

  // Valeurs par défaut
  const defaultValues = {
    section1: {
      title: "Béton armé (neuf et réhabilitation)",
      description: "Conception, calcul et dessin des structures en béton armé, optimisation des sections, vérification de la durabilité, dimensionnement selon les dernières normes Eurocodes. Réhabilitation des bâtis anciens pour les adapter aux exigences actuelles et prolonger leur durée de vie.",
    },
    section2: {
      title: "Métal (charpentes, assemblages spécifiques)",
      description: "Études techniques de charpentes et ossatures métalliques, conception des nœuds d'assemblage, vérification de la stabilité globale, maîtrise des spécificités liées à la légèreté, la rapidité de construction et la préfabrication.",
    },
    section3: {
      title: "Bois (structures mixtes et traditionnelles)",
      description: "Études et optimisation des réseaux (eau potable, assainissement, voirie, bassins de rétention), prise en compte des enjeux environnementaux et urbains pour la réalisation d'aménagements collectifs: routes, réseaux souterrains, bassins d'orage, etc.",
    },
    section4: {
      title: "Réhabilitation et renforcement d'ouvrages existants",
      description: "Diagnostic des pathologies, propositions de solutions de renforcement, chiffrage, suivi des travaux pour garantir sécurité, conformité et pérennité des ouvrages existants.",
    },
  };

  const section1 = {
    title: pageContent?.sections?.section1?.title || defaultValues.section1.title,
    description: pageContent?.sections?.section1?.description || defaultValues.section1.description,
  };
  const section2 = {
    title: pageContent?.sections?.section2?.title || defaultValues.section2.title,
    description: pageContent?.sections?.section2?.description || defaultValues.section2.description,
  };
  const section3 = {
    title: pageContent?.sections?.section3?.title || defaultValues.section3.title,
    description: pageContent?.sections?.section3?.description || defaultValues.section3.description,
  };
  const section4 = {
    title: pageContent?.sections?.section4?.title || defaultValues.section4.title,
    description: pageContent?.sections?.section4?.description || defaultValues.section4.description,
  };

  return (
    <div className="nos-ref bg-3">
      <Toast ref={toast} />

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Structures</h1>
      </div>

      <div className="max-width-1140-px flex flex-wrap items-center realisations mx-auto justify-center w-100-perc">
        {/* Section 1 */}
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-7.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 relative">
          <PencilEditButton
            title={section1.title}
            description={section1.description}
            onSave={(title, description) => handleSaveSection("section1", title, description)}
          />
          <p className="fz-35 poppinsbold clr-4 mt-5">
            {section1.title}
          </p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">
            {section1.description}
          </p>
        </div>

        {/* Section 2 */}
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10 relative">
          <PencilEditButton
            title={section2.title}
            description={section2.description}
            onSave={(title, description) => handleSaveSection("section2", title, description)}
          />
          <p className="fz-35 poppinsbold clr-4 mt-5">
            {section2.title}
          </p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">
            {section2.description}
          </p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-8.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>

        {/* Section 3 */}
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-9.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 relative">
          <PencilEditButton
            title={section3.title}
            description={section3.description}
            onSave={(title, description) => handleSaveSection("section3", title, description)}
          />
          <p className="fz-35 poppinsbold clr-4 mt-5">
            {section3.title}
          </p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">
            {section3.description}
          </p>
        </div>

        {/* Section 4 */}
        <div className="col-md-50 col-lg-60 col-gt-lg-60 col-sm-50 col-xs-100 py-3 px-5 mb-3 mt-10 relative">
          <PencilEditButton
            title={section4.title}
            description={section4.description}
            onSave={(title, description) => handleSaveSection("section4", title, description)}
          />
          <p className="fz-35 poppinsbold clr-4 mt-5">
            {section4.title}
          </p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">
            {section4.description}
          </p>
        </div>
        <div className="col-md-50 col-lg-40 col-gt-lg-40 col-sm-50 col-xs-100 p-3 mb-3 mt-10">
          <Image
            loading="eager"
            src="/images/esquisse-de-nouvelle-construction-10.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={550}
            height={466}
          />
        </div>
      </div>
    </div>
  );
}
