"use client";

import { apiName, paths } from "@/lib/constants";
import { SEOConfig } from "@/lib/types";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { get, post } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";

// Fonction pour convertir une chaîne en phrase lisible
function formatPageName(pageName: string): string {
  const formatted = pageName
    .replace(/-/g, " ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .trim();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

// Fonction pour poster une configuration SEO
async function postSeoConfig(data: SEOConfig) {
  try {
    const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    if (!authToken) {
      throw new Error("Token d'autorisation invalide");
    }

    const restOperation = post({
      apiName: apiName,
      path: paths.seo_config_url,
      options: {
        headers: { Authorization: authToken },
        body: data as any,
      },
    });

    const response = await restOperation.response;
    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    throw error;
  }
}

// Composant Modal pour modifier les configurations SEO
function Modal({
  isOpen,
  onClose,
  config,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  config: SEOConfig | null;
  onSave: (config: SEOConfig) => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [pageName, setPageName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

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

    const updatedConfig: SEOConfig = {
      MetaTitle: title,
      MetaDescription: description,
      PageName: pageName,
    };

    try {
      await postSeoConfig(updatedConfig);
      onSave(updatedConfig);
      onClose();
    } catch (error) {
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
          <h2 className="text-white">
            Modifier la page {formatPageName(pageName)}
          </h2>
        </div>
        <div className="modal-body p-3">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
              {error}
            </div>
          )}

          <div className="form-group-2">
            <label>Titre:</label>
            <input
              className="input-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <label className="block mt-3">
            Description:
            <textarea
              className="textarea-control-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="flex justify-end px-3 mb-3 gap-2">
          <button className="btn-danger" onClick={onClose}>
            Annuler
          </button>
          <button
            className="btn-blue"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "En cours..." : "Sauvegarder"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant principal
export default function ListeConfigPage() {
  const [seoConfigs, setSeoConfigs] = useState<SEOConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentConfig, setCurrentConfig] = useState<SEOConfig | null>(null);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const fetchSEOConfigs = async () => {
      setLoading(true);
      setError(null);

      try {
        const authToken = (
          await fetchAuthSession()
        ).tokens?.idToken?.toString();
        if (!authToken) {
          throw new Error("Token d'autorisation invalide");
        }

        const restOperation = await get({
          apiName: apiName,
          path: paths.seo_config_list,
          options: { headers: { Authorization: authToken } },
        });

        const apiResponse = await restOperation.response;
        const jsonData = await apiResponse.body.json();

        if (Array.isArray(jsonData)) {
          const validSEOConfigs = (jsonData as any[]).filter(
            (item): item is SEOConfig =>
              item !== null &&
              typeof item === "object" &&
              typeof item.MetaTitle === "string" &&
              typeof item.MetaDescription === "string" &&
              typeof item.PageName === "string"
          );
          setSeoConfigs(validSEOConfigs);
        } else {
          throw new Error("Format de réponse API invalide");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Une erreur inconnue s'est produite";
        console.error(
          "Erreur lors de la récupération des configurations SEO:",
          error
        );
        setError(errorMessage);

        toast.current?.show({
          severity: "error",
          summary: "Erreur",
          detail: errorMessage,
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSEOConfigs();
  }, []);

  const handleSave = (updatedConfig: SEOConfig) => {
    setSeoConfigs((prevConfigs) =>
      prevConfigs.map((config) =>
        config.PageName === updatedConfig.PageName ? updatedConfig : config
      )
    );
    toast.current?.show({
      severity: "success",
      summary: "Succès",
      detail: "Configuration mise à jour avec succès",
      life: 3000,
    });
  };

  if (loading) {
    return (
      <div className="loader">
        <span>C</span>
        <span>h</span>
        <span>a</span>
        <span>r</span>
        <span>g</span>
        <span>e</span>
        <span>m</span>
        <span>e</span>
        <span>n</span>
        <span>t</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Erreur: {error}
      </div>
    );
  }

  return (
    <div className="w-100 ">
      <Toast ref={toast} />

      <div className="success-content p-3">
        <h1 className="text-bold fz-25 px-2 mt-2 mb-3" style={{ color: "#1e293b" }}>
          Paramétrage SEO
        </h1>

        <div className="flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden table-responsive shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead style={{ backgroundColor: "#1e293b" }}>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                        Nom de la page
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Titre
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Description
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {seoConfigs.map((config) => (
                      <tr key={config.PageName}>
                        <td className="py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                          {config.PageName}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900">
                          {config.MetaTitle}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900">
                          {config.MetaDescription}
                        </td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right sm:pr-6">
                          <button
                            className="btn-blue"
                            onClick={() => {
                              setCurrentConfig(config);
                              setIsModalOpen(true);
                            }}
                          >
                            Modifier
                          </button>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        config={currentConfig}
        onSave={handleSave}
      />
    </div>
  );
}
