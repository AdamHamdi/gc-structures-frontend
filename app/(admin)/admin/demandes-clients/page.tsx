"use client";

import { useEffect, useState, useCallback } from "react";
import { get } from "@aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { FaChevronDown, FaChevronUp, FaEye, FaDownload, FaTimes } from "react-icons/fa";
import { apiName, paths } from "@/lib/constants";

type RequestItem = {
  CustomerId: string;
  Contact: string;
  Name: string;
  Message: string;
  RequestDate: string;
  FileName?: string;
};

type DownloadUrlResponse = {
  download_url: string;
  expires_in: number;
  file_name: string;
};

export default function DemandesClients() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [sortedRequests, setSortedRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFileName, setPreviewFileName] = useState<string>("");
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    if (requests.length > 0) {
      const sortedItems = [...requests].sort((a, b) => {
        const dateA = new Date(a.RequestDate).getTime();
        const dateB = new Date(b.RequestDate).getTime();
        return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
      });
      setSortedRequests(sortedItems);
    }
  }, [requests, sortDirection]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
        if (!authToken) {
          console.error("Token d'autorisation non valide.");
          setLoading(false);
          return;
        }

        const restOperation = await get({
          apiName: apiName,
          path: paths.customer_request,
          options: {
            headers: { Authorization: authToken },
          },
        });

        const apiResponse = await restOperation.response;
        const jsonData = await apiResponse.body.json();

        if (Array.isArray(jsonData)) {
          setRequests(jsonData as RequestItem[]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getDownloadUrl = useCallback(async (customerId: string, fileName: string): Promise<string | null> => {
    try {
      const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      if (!authToken) {
        console.error("Token d'autorisation non valide.");
        return null;
      }

      const restOperation = await get({
        apiName: apiName,
        path: paths.customer_download_url,
        options: {
          headers: { Authorization: authToken },
          queryParams: {
            customerId: customerId,
            fileName: fileName,
          },
        },
      });

      const apiResponse = await restOperation.response;
      const jsonData = await apiResponse.body.json() as DownloadUrlResponse;
      return jsonData.download_url;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'URL de téléchargement:", error);
      return null;
    }
  }, []);

  const handlePreview = async (item: RequestItem) => {
    if (!item.FileName) return;

    setPreviewLoading(true);
    setPreviewFileName(item.FileName);

    const url = await getDownloadUrl(item.CustomerId, item.FileName);
    if (url) {
      setPreviewUrl(url);
    }
    setPreviewLoading(false);
  };

  const handleDownload = async (item: RequestItem) => {
    if (!item.FileName) return;

    const url = await getDownloadUrl(item.CustomerId, item.FileName);
    if (url) {
      // Ouvrir dans un nouvel onglet pour télécharger
      window.open(url, "_blank");
    }
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setPreviewFileName("");
  };

  const handleSortByDate = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const isPreviewableFile = (fileName: string): boolean => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    return ["pdf", "png", "jpg", "jpeg", "gif", "webp"].includes(ext);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Demandes de contact
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Retrouvez ici l'ensemble des demandes de contact soumises par vos visiteurs.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="table-header">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                      onClick={handleSortByDate}
                    >
                      <div className="group inline-flex items-center">
                        Date
                        <span className="ml-2 flex-none rounded text-white">
                          {sortDirection === "desc" ? (
                            <FaChevronDown className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <FaChevronUp className="h-4 w-4" aria-hidden="true" />
                          )}
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Pièce jointe
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="h-64 flex justify-center items-center">
                          <div className="bg-white p-6 rounded-lg">
                            <div className="animate-spin h-8 w-8 border-t-2 border-orange-500 border-solid rounded-full mx-auto"></div>
                            <p className="text-center mt-2 text-gray-600">
                              Chargement des données...
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : sortedRequests.length === 0 ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="h-32 flex justify-center items-center">
                          <p className="text-gray-500">Aucune demande de contact pour le moment.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    sortedRequests.map((item, index) => (
                      <tr
                        key={item.CustomerId || index}
                        className="even:bg-gray-50 divide-x divide-gray-200 hover:bg-gray-100"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {item.Name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.Contact}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 max-w-md">
                          <div className="line-clamp-3">{item.Message}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.RequestDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.FileName ? (
                            <div className="flex items-center gap-3">
                              {isPreviewableFile(item.FileName) && (
                                <button
                                  onClick={() => handlePreview(item)}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Aperçu"
                                >
                                  <FaEye className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDownload(item)}
                                className="text-green-600 hover:text-green-800"
                                title="Télécharger"
                              >
                                <FaDownload className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de prévisualisation */}
      {(previewUrl || previewLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white rounded-lg max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {previewFileName}
              </h3>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              {previewLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin h-8 w-8 border-t-2 border-orange-500 border-solid rounded-full"></div>
                </div>
              ) : previewUrl && (
                <>
                  {previewFileName.toLowerCase().endsWith(".pdf") ? (
                    <iframe
                      src={previewUrl}
                      className="w-full h-[70vh]"
                      title="Aperçu PDF"
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt={previewFileName}
                      className="max-w-full h-auto mx-auto"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
