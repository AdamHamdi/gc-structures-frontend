"use client";

import { apiName, paths } from "@/lib/constants";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { get, put } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { FaPencilAlt } from "react-icons/fa";

interface PageContent {
  PageName: string;
  sections: {
    main?: {
      title?: string;
      content?: string;
    };
  };
}

export default function MentionsLegalesAdminPage() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [tempContent, setTempContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const toast = useRef<Toast>(null);

  const defaultContent = `<h2>1. Éditeur du site</h2>
<p>Le site gc-structures.com est édité par :</p>
<p><strong>GC Structures</strong><br/>
Bureau d'études en génie civil et structures<br/>
Adresse : [Adresse à compléter]<br/>
Téléphone : [Numéro à compléter]<br/>
Email : contact@gc-structures.com<br/>
SIRET : [Numéro à compléter]</p>

<h2>2. Directeur de la publication</h2>
<p>[Nom du directeur de publication à compléter]</p>

<h2>3. Hébergeur</h2>
<p>Le site est hébergé par :<br/>
Amazon Web Services (AWS)</p>

<h2>4. Propriété intellectuelle</h2>
<p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>

<h2>5. Données personnelles</h2>
<p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.</p>

<h2>6. Cookies</h2>
<p>Ce site utilise des cookies pour améliorer votre expérience de navigation.</p>

<h2>7. Limitation de responsabilité</h2>
<p>GC Structures s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur ce site.</p>`;

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const restOperation = get({
        apiName: apiName,
        path: paths.cms_page_content,
        options: { queryParams: { PageName: "mentions-legales" } },
      });

      const response = await restOperation.response;
      const jsonData = await response.body.json();

      if (jsonData && typeof jsonData === "object") {
        const data = jsonData as unknown as PageContent;
        setPageContent(data);
        setTempTitle(data.sections?.main?.title || "Mentions légales");
        setTempContent(data.sections?.main?.content || defaultContent);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du contenu:", error);
      setPageContent({
        PageName: "mentions-legales",
        sections: {
          main: {
            title: "Mentions légales",
            content: defaultContent,
          },
        },
      });
      setTempTitle("Mentions légales");
      setTempContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      if (!authToken) {
        throw new Error("Token d'autorisation invalide");
      }

      const payload = {
        PageName: "mentions-legales",
        SectionId: "main",
        Content: JSON.stringify({ id: "main", title: tempTitle, content: tempContent }),
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

      setPageContent((prev) => ({
        ...prev!,
        sections: { main: { title: tempTitle, content: tempContent } },
      }));

      setIsEditing(false);
      toast.current?.show({
        severity: "success",
        summary: "Succès",
        detail: "Page mise à jour avec succès !",
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
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <span>Chargement...</span>
      </div>
    );
  }

  const content = pageContent?.sections?.main;

  return (
    <div className="bg-3 min-h-screen">
      <Toast ref={toast} />

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Mentions légales</h1>
      </div>

      <div className="max-width-1150-px mx-auto py-10 px-4">
        <div className="flex justify-end mb-5">
          <button
            className="btn-danger-2 btn-modif rounded-50 px-3 flex items-center"
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaPencilAlt className="mr-2" size={14} />
            <span>{isEditing ? "Annuler" : "Modifier"}</span>
          </button>
        </div>

        {isEditing ? (
          <div className="bg-white p-5 rounded-15">
            <div className="mb-4">
              <label className="fz-18 text-bold clr-4 block mb-2">Titre</label>
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="form-control w-100-perc"
              />
            </div>
            <div className="mb-4">
              <label className="fz-18 text-bold clr-4 block mb-2">Contenu (HTML)</label>
              <textarea
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                rows={20}
                className="form-control w-100-perc"
                style={{ fontFamily: "monospace", fontSize: "14px" }}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button className="btn-danger" onClick={() => setIsEditing(false)}>
                Annuler
              </button>
              <button className="btn-blue" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "En cours..." : "Sauvegarder"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-15">
            <h1 className="fz-45 poppinsbold clr-4 mb-10">
              {content?.title || "Mentions légales"}
            </h1>
            <div
              className="legal-content fz-17 clr-4 line-height-36"
              dangerouslySetInnerHTML={{
                __html: content?.content || defaultContent,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
