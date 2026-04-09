"use client";

import { apiName, paths } from "@/lib/constants";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { get, put } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { FaPencilAlt } from "react-icons/fa";

interface SectionContent {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  items?: Array<{
    title: string;
    description: string;
  }>;
}

interface PageContent {
  PageName: string;
  sections: {
    [key: string]: SectionContent;
  };
}

// Composant bouton Modifier (style Froidinov)
function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="btn-danger-2 btn-modif rounded-50 px-3 flex items-center"
      onClick={onClick}
    >
      <FaPencilAlt className="mr-2" size={14} />
      <span>Modifier</span>
    </button>
  );
}

// Composant icône stylo pour édition rapide
function EditIconButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="edit-icon-btn"
      onClick={onClick}
      title="Modifier"
    >
      <FaPencilAlt size={14} />
    </button>
  );
}

// Section générique éditable
function EditableSection({
  sectionTitle,
  content,
  onSave,
  fields,
}: {
  sectionTitle: string;
  content: SectionContent;
  onSave: (content: SectionContent) => Promise<void>;
  fields: Array<{ key: string; label: string; type: 'text' | 'textarea' }>;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState<SectionContent>(content);

  useEffect(() => {
    setTempData(content);
  }, [content]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(tempData);
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (key: string, value: string) => {
    setTempData({ ...tempData, [key]: value });
  };

  return (
    <div className="section-preview mb-5 p-5">
      <h2 className="text-blue text-bold fz-25 mb-4">{sectionTitle}</h2>

      <div className="bg-gray-100 p-6 rounded-lg">
        {/* Affichage du contenu */}
        {fields.map((field) => (
          <div key={field.key} className="mb-3">
            <span className="text-bold fz-14 text-muet">{field.label}:</span>
            <p className="fz-16 mt-1">
              {(tempData as any)[field.key] || `[${field.label} non défini]`}
            </p>
          </div>
        ))}

        <div className="mt-4">
          <EditButton onClick={() => setDropdownVisible(!isDropdownVisible)} />

          {isDropdownVisible && (
            <div className="drop-down-cont">
              <div className="drop-down p-5" style={{ minWidth: '400px' }}>
                {fields.map((field) => (
                  <div key={field.key} className="mb-3">
                    <label className="fz-18">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={(tempData as any)[field.key] || ''}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <input
                        type="text"
                        value={(tempData as any)[field.key] || ''}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    )}
                  </div>
                ))}

                <div className="flex justify-end items-center mt-3 gap-2">
                  <button
                    className="btn-danger height-35"
                    onClick={() => {
                      setDropdownVisible(false);
                      setTempData(content);
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    className="btn-blue height-35"
                    onClick={handleSave}
                  >
                    {isLoading ? "En cours..." : "Sauvegarder"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Section avec liste d'items
function EditableItemsSection({
  sectionTitle,
  content,
  onSave,
  itemLabel,
}: {
  sectionTitle: string;
  content: SectionContent;
  onSave: (content: SectionContent) => Promise<void>;
  itemLabel: string;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(content?.title || '');
  const [tempItems, setTempItems] = useState(content?.items || []);

  useEffect(() => {
    setTempTitle(content?.title || '');
    setTempItems(content?.items || []);
  }, [content]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({
        ...content,
        title: tempTitle,
        items: tempItems,
      });
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = (index: number, field: 'title' | 'description', value: string) => {
    const newItems = [...tempItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setTempItems(newItems);
  };

  const addItem = () => {
    setTempItems([...tempItems, { title: '', description: '' }]);
  };

  const removeItem = (index: number) => {
    setTempItems(tempItems.filter((_, i) => i !== index));
  };

  return (
    <div className="section-preview mb-5 p-5">
      <h2 className="text-blue text-bold fz-25 mb-4">{sectionTitle}</h2>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-blue-2 text-bold fz-20 mb-4">{tempTitle}</h3>

        <div className="flex flex-wrap gap-3">
          {tempItems.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg flex-1 min-w-[200px] relative">
              <div className="absolute top-2 right-2">
                <EditIconButton onClick={() => setDropdownVisible(true)} />
              </div>
              <h4 className="text-bold fz-16 mb-2">{item.title || `${itemLabel} ${index + 1}`}</h4>
              <p className="fz-14 text-muet">{item.description?.substring(0, 100) || '[Description]'}...</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <EditButton onClick={() => setDropdownVisible(!isDropdownVisible)} />

          {isDropdownVisible && (
            <div className="drop-down-cont">
              <div className="drop-down p-5" style={{ minWidth: '500px', maxHeight: '70vh', overflowY: 'auto' }}>
                <label className="fz-18">Titre de la section</label>
                <textarea
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  rows={1}
                />

                {tempItems.map((item, index) => (
                  <div key={index} className="mt-4 p-3 bg-gray-50 rounded relative">
                    <button
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      onClick={() => removeItem(index)}
                      title="Supprimer"
                    >
                      ×
                    </button>
                    <label className="fz-16 text-bold">{itemLabel} {index + 1}</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateItem(index, 'title', e.target.value)}
                      className="w-full p-2 border rounded mt-2"
                      placeholder="Titre"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      rows={2}
                      className="mt-2"
                      placeholder="Description"
                    />
                  </div>
                ))}

                <button
                  className="mt-3 text-blue-600 hover:text-blue-800 text-sm"
                  onClick={addItem}
                >
                  + Ajouter un {itemLabel.toLowerCase()}
                </button>

                <div className="flex justify-end items-center mt-3 gap-2">
                  <button className="btn-danger height-35" onClick={() => setDropdownVisible(false)}>
                    Annuler
                  </button>
                  <button className="btn-blue height-35" onClick={handleSave}>
                    {isLoading ? "En cours..." : "Sauvegarder"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Props pour la page admin de service
interface ServiceAdminPageProps {
  pageName: string;
  pageTitle: string;
  sections: Array<{
    id: string;
    title: string;
    type: 'simple' | 'items';
    fields?: Array<{ key: string; label: string; type: 'text' | 'textarea' }>;
    itemLabel?: string;
  }>;
}

export default function ServiceAdminPage({ pageName, pageTitle, sections }: ServiceAdminPageProps) {
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
        options: { queryParams: { PageName: pageName } },
      });

      const response = await restOperation.response;
      const jsonData = await response.body.json();

      if (jsonData && typeof jsonData === "object") {
        setPageContent(jsonData as unknown as PageContent);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du contenu:", error);
      // Initialize with default content if fetch fails
      const defaultSections: { [key: string]: SectionContent } = {};
      sections.forEach((section) => {
        defaultSections[section.id] = { title: '', description: '' };
      });
      setPageContent({
        PageName: pageName,
        sections: defaultSections,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (sectionId: string, newContent: SectionContent) => {
    try {
      const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      if (!authToken) {
        throw new Error("Token d'autorisation invalide");
      }

      const payload = {
        PageName: pageName,
        SectionId: sectionId,
        Content: JSON.stringify({
          id: sectionId,
          ...newContent,
        }),
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

      // Update local state
      setPageContent((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          sections: {
            ...prev.sections,
            [sectionId]: newContent,
          },
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
        detail: "Échec de la sauvegarde. Veuillez réessayer.",
        life: 3000,
      });
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <span>C</span><span>h</span><span>a</span><span>r</span><span>g</span>
        <span>e</span><span>m</span><span>e</span><span>n</span><span>t</span>
        <span>.</span><span>.</span><span>.</span>
      </div>
    );
  }

  return (
    <div className="services-items">
      <Toast ref={toast} />

      <div className="services-items-content">
        <h1 className="text-blue text-bold fz-30 mb-5">
          Gestion du contenu - {pageTitle}
        </h1>

        {sections.map((section) => {
          const sectionContent = pageContent?.sections?.[section.id] || {};

          if (section.type === 'items') {
            return (
              <EditableItemsSection
                key={section.id}
                sectionTitle={section.title}
                content={sectionContent}
                onSave={(content) => handleSaveSection(section.id, content)}
                itemLabel={section.itemLabel || 'Élément'}
              />
            );
          }

          return (
            <EditableSection
              key={section.id}
              sectionTitle={section.title}
              content={sectionContent}
              onSave={(content) => handleSaveSection(section.id, content)}
              fields={section.fields || [
                { key: 'title', label: 'Titre', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
              ]}
            />
          );
        })}
      </div>
    </div>
  );
}
