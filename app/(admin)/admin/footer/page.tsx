"use client";

import { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";
import Loader from "../../components/Loader";
import Image from "next/image";
import Link from "next/link";
import { PencilEditButton } from "../../components/EditableSection";
import { getCmsPage, updateCmsSection } from "@/lib/api";

interface FooterContent { phone?: string; email?: string; }
interface PageContent { PageName: string; sections: { main?: FooterContent }; }

const PAGE = "footer";

export default function FooterAdminPage() {
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
      setPageContent({ PageName: PAGE, sections: { main: { phone: "12 365 125 124", email: "contact@gc-structures.com" } } });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (phone: string, email: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      await updateCmsSection(token, PAGE, "main", { id: "main", phone, email });
      setPageContent((prev) => prev ? { ...prev, sections: { ...prev.sections, main: { phone, email } } } : prev);
      toast.show("success", "Succès", "Footer mis à jour !");
    } catch {
      toast.show("error", "Erreur", "Échec de la sauvegarde.");
    }
  };

  if (loading) return <Loader inline />;

  const content = pageContent?.sections?.main || {};

  return (
    <div className="bg-3">

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Footer</h1>
      </div>
      <div className="footer mt-10">
        <div className="max-width-1150-px mx-auto flex items-center flex-wrap px-4">
          <div className="col-gt-sm-33 col-sm-50 col-xs-100 mb-5">
            <Image loading="eager" src="/images/logo.webp" alt="logo" className="mx-2" width={234} height={69} style={{ height: "auto" }} />
          </div>
          <div className="col-gt-sm-33 col-sm-50 col-xs-100 mb-5 relative">
            <PencilEditButton
              title={content.phone || "12 365 125 124"}
              description={content.email || "contact@gc-structures.com"}
              onSave={async (phone, email) => handleSaveSection(phone, email)}
            />
            <p className="fz-20 poppins-semibold clr-4">Téléphone</p>
            <div className="flex items-center">
              <svg width="24" height="17" fill="#444" className="mr-2"><use href="/icons/icons.svg#icon-phone"></use></svg>
              <Link href={`tel:${content.phone?.replace(/\s/g, "")}`} className="fz-17 clr-4">{content.phone || "12 365 125 124"}</Link>
            </div>
          </div>
          <div className="col-gt-sm-33 col-sm-50 col-xs-100 mb-5">
            <p className="fz-20 poppins-semibold clr-4">Email</p>
            <div className="flex items-center">
              <svg width="24" height="17" fill="#444" className="mr-2"><use href="/icons/icons.svg#icon-email"></use></svg>
              <Link href={`mailto:${content.email}`} className="fz-17 clr-4">{content.email || "contact@gc-structures.com"}</Link>
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
    </div>
  );
}