"use client";

import { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";
import Loader from "../../components/Loader";
import { FaPencilAlt } from "react-icons/fa";
import { getCmsPage, updateCmsSection } from "@/lib/api";

interface PageContent {
  PageName: string;
  sections: { main?: { title?: string; content?: string } };
}

const PAGE = "politique-confidentialite";
const DEFAULT_CONTENT = `<h2>1. Collecte des informations</h2>
<p>Nous recueillons des informations lorsque vous remplissez un formulaire ou nous contactez. Les informations recueillies incluent votre nom, adresse e-mail et numéro de téléphone.</p>
<h2>2. Utilisation des informations</h2>
<p>Les informations que nous recueillons sont utilisées pour vous contacter et améliorer notre service.</p>
<h2>3. Protection des informations</h2>
<p>Nous mettons en œuvre des mesures de sécurité pour préserver la sécurité de vos informations personnelles.</p>
<h2>4. Cookies</h2>
<p>Nos cookies améliorent l'accès à notre site et identifient les visiteurs réguliers.</p>
<h2>5. Vos droits</h2>
<p>Conformément au RGPD, vous disposez des droits suivants : droit d'accès, de rectification, à l'effacement, à la portabilité et d'opposition.</p>
<h2>6. Contact</h2>
<p>Pour toute question : contact@gc-structures.com</p>`;

export default function PolitiqueConfidentialiteAdminPage() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [tempContent, setTempContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  useEffect(() => { fetchPageContent(); }, []);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const data: PageContent = await getCmsPage(PAGE);
      setPageContent(data);
      setTempTitle(data.sections?.main?.title || "Politique de confidentialité");
      setTempContent(data.sections?.main?.content || DEFAULT_CONTENT);
    } catch {
      setPageContent({ PageName: PAGE, sections: { main: { title: "Politique de confidentialité", content: DEFAULT_CONTENT } } });
      setTempTitle("Politique de confidentialité");
      setTempContent(DEFAULT_CONTENT);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token") || "";
      await updateCmsSection(token, PAGE, "main", { id: "main", title: tempTitle, content: tempContent });
      setPageContent((prev) => ({ ...prev!, sections: { main: { title: tempTitle, content: tempContent } } }));
      setIsEditing(false);
      toast.show("success", "Succès", "Page mise à jour !");
    } catch {
      toast.show("error", "Erreur", "Échec de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <Loader inline />;

  const content = pageContent?.sections?.main;

  return (
    <div className="bg-3 min-h-screen">

      <div className="refferences px-4 flex-center">
        <h1 className="clr-4 poppinsbold text-center fz-55 mb-0">Politique de confidentialité</h1>
      </div>
      <div className="max-width-1150-px mx-auto py-10 px-4">
        <div className="flex justify-end mb-5">
          <button className="btn-danger-2 btn-modif rounded-50 px-3 flex items-center" onClick={() => setIsEditing(!isEditing)}>
            <FaPencilAlt className="mr-2" size={14} />
            <span>{isEditing ? "Annuler" : "Modifier"}</span>
          </button>
        </div>
        {isEditing ? (
          <div className="bg-white p-5 rounded-15">
            <div className="mb-4">
              <label className="fz-18 text-bold clr-4 block mb-2">Titre</label>
              <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} className="form-control w-100-perc" />
            </div>
            <div className="mb-4">
              <label className="fz-18 text-bold clr-4 block mb-2">Contenu (HTML)</label>
              <textarea value={tempContent} onChange={(e) => setTempContent(e.target.value)} rows={20} className="form-control w-100-perc" style={{ fontFamily: "monospace", fontSize: "14px" }} />
            </div>
            <div className="flex justify-end gap-3">
              <button className="btn-danger" onClick={() => setIsEditing(false)}>Annuler</button>
              <button className="btn-blue" onClick={handleSave} disabled={isSaving}>{isSaving ? "En cours..." : "Sauvegarder"}</button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-15">
            <h1 className="fz-45 poppinsbold clr-4 mb-10">{content?.title || "Politique de confidentialité"}</h1>
            <div className="legal-content fz-17 clr-4 line-height-36" dangerouslySetInnerHTML={{ __html: content?.content || DEFAULT_CONTENT }} />
          </div>
        )}
      </div>
    </div>
  );
}