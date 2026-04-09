"use client";

import { apiName, paths } from "@/lib/constants";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { get, put } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import Image from "next/image";
import Link from "next/link";
import { PencilEditButton } from "../../components/EditableSection";

interface FooterContent {
  phone?: string;
  email?: string;
}

interface PageContent {
  PageName: string;
  sections: {
    main?: FooterContent;
  };
}

export default function FooterAdminPage() {
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
        options: { queryParams: { PageName: "footer" } },
      });

      const response = await restOperation.response;
      const jsonData = await response.body.json();

      if (jsonData && typeof jsonData === "object") {
        setPageContent(jsonData as unknown as PageContent);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du contenu:", error);
      setPageContent({
        PageName: "footer",
        sections: {
          main: {
            phone: "12 365 125 124",
            email: "contact@gc-structures.com",
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (phone: string, email: string) => {
    try {
      const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      if (!authToken) {
        throw new Error("Token d'autorisation invalide");
      }

      const payload = {
        PageName: "footer",
        SectionId: "main",
        Content: JSON.stringify({ id: "main", phone, email }),
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
          sections: { ...prev.sections, main: { phone, email } },
        };
      });

      toast.current?.show({
        severity: "success",
        summary: "Succès",
        detail: "Footer mis à jour avec succès !",
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

  const content = pageContent?.sections?.main || {};

  return (
    <div className="bg-3">
      <Toast ref={toast} />

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Footer</h1>
      </div>

      {/* Preview du footer */}
      <div className="footer mt-10">
        <div className="max-width-1150-px mx-auto flex items-center flex-wrap px-4">
          <div className="col-gt-sm-33 col-sm-50 col-xs-100 mb-5">
            <Image
              loading="eager"
              src="/images/logo.webp"
              alt="logo"
              className="mx-2"
              width={234}
              height={69}
            />
          </div>
          <div className="col-gt-sm-33 col-sm-50 col-xs-100 mb-5 relative">
            <PencilEditButton
              title={content.phone || "12 365 125 124"}
              description={content.email || "contact@gc-structures.com"}
              onSave={async (phone, email) => handleSaveSection(phone, email)}
            />
            <p className="fz-20 poppins-semibold clr-4">Téléphone</p>
            <div className="flex items-center">
              <svg width="24" height="17" fill="#444" className="mr-2">
                <use href="/icons/icons.svg#icon-phone"></use>
              </svg>
              <Link href={`tel:${content.phone?.replace(/\s/g, "")}`} className="fz-17 clr-4">
                {content.phone || "12 365 125 124"}
              </Link>
            </div>
          </div>
          <div className="col-gt-sm-33 col-sm-50 col-xs-100 mb-5">
            <p className="fz-20 poppins-semibold clr-4">Email</p>
            <div className="flex items-center">
              <svg width="24" height="17" fill="#444" className="mr-2">
                <use href="/icons/icons.svg#icon-email"></use>
              </svg>
              <Link href={`mailto:${content.email}`} className="fz-17 clr-4">
                {content.email || "contact@gc-structures.com"}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-center flex-wrap items-center mt-10">
          <span className="fz-17 clr-4 px-3 mb-3">Cookies</span>
          <span className="px-3 mb-3">|</span>
          <span className="fz-17 clr-4 px-3 mb-3">Politique de confidentialité</span>
          <span className="px-3 mb-3">|</span>
          <span className="fz-17 clr-4 px-3 mb-3">Mentions légales</span>
        </div>
      </div>

      <div className="p-5 mt-5">
        <p className="fz-14 clr-4 text-center">
          Note: Le formulaire d&apos;édition ci-dessus modifie le téléphone (titre) et l&apos;email (description)
        </p>
      </div>
    </div>
  );
}
