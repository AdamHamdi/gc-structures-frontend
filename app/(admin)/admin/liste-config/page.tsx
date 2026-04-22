"use client";

import { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";
import Loader from "../../components/Loader";
import { getCmsPage, updateCmsSection } from "@/lib/api";

interface SEOConfig {
  PageName: string;
  MetaTitle: string;
  MetaDescription: string;
}

function formatPageName(pageName: string): string {
  const formatted = pageName.replace(/-/g, " ").replace(/([A-Z])/g, " $1").toLowerCase().trim();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function Modal({ isOpen, onClose, config, onSave }: {
  isOpen: boolean;
  onClose: () => void;
  config: SEOConfig | null;
  onSave: (config: SEOConfig) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pageName, setPageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (config) {
      setTitle(config.MetaTitle || "");
      setDescription(config.MetaDescription || "");
      setPageName(config.PageName || "");
      setError("");
    }
  }, [config]);

  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || "";
      await updateCmsSection(token, "seo", pageName, { MetaTitle: title, MetaDescription: description, PageName: pageName });
      onSave({ MetaTitle: title, MetaDescription: description, PageName: pageName });
      onClose();
    } catch {
      setError("Une erreur s'est produite lors de la sauvegarde.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content p-0">
        <div className="modal-header bg-blue p-3">
          <h2 className="text-white">Modifier la page {formatPageName(pageName)}</h2>
        </div>
        <div className="modal-body p-3">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">{error}</div>}
          <div className="form-group-2">
            <label>Titre:</label>
            <input className="input-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <label className="block mt-3">
            Description:
            <textarea className="textarea-control-2" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
        </div>
        <div className="flex justify-end px-3 mb-3 gap-2">
          <button className="btn-danger" onClick={onClose}>Annuler</button>
          <button className="btn-blue" onClick={handleSave} disabled={isLoading}>{isLoading ? "En cours..." : "Sauvegarder"}</button>
        </div>
      </div>
    </div>
  );
}

export default function ListeConfigPage() {
  const [seoConfigs, setSeoConfigs] = useState<SEOConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<SEOConfig | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchSEOConfigs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCmsPage("seo");
        if (Array.isArray(data)) {
          setSeoConfigs(data);
        } else if (data?.sections) {
          const configs = Object.entries(data.sections).map(([key, val]: [string, any]) => ({
            PageName: key,
            MetaTitle: val?.MetaTitle || "",
            MetaDescription: val?.MetaDescription || "",
          }));
          setSeoConfigs(configs);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erreur inconnue";
        setError(msg);
        toast.show("error", "Erreur", msg);
      } finally {
        setLoading(false);
      }
    };
    fetchSEOConfigs();
  }, []);

  const handleSave = (updatedConfig: SEOConfig) => {
    setSeoConfigs((prev) => prev.map((c) => c.PageName === updatedConfig.PageName ? updatedConfig : c));
    toast.show("success", "Succès", "Configuration mise à jour");
  };

  if (loading) return <Loader inline />;

  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Erreur: {error}</div>;

  return (
    <div className="w-100">

      <div className="success-content p-3">
        <h1 className="text-bold fz-25 px-2 mt-2 mb-3" style={{ color: "#1e293b" }}>Paramétrage SEO</h1>
        <div className="flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden table-responsive shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead style={{ backgroundColor: "#1e293b" }}>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Nom de la page</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Titre</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Description</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {seoConfigs.map((config) => (
                      <tr key={config.PageName}>
                        <td className="py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">{config.PageName}</td>
                        <td className="px-3 py-4 text-sm text-gray-900">{config.MetaTitle}</td>
                        <td className="px-3 py-4 text-sm text-gray-900">{config.MetaDescription}</td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right sm:pr-6">
                          <button className="btn-blue" onClick={() => { setCurrentConfig(config); setIsModalOpen(true); }}>Modifier</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} config={currentConfig} onSave={handleSave} />
    </div>
  );
}