"use client";

import { useEffect, useState, useCallback } from "react";
import { FaChevronDown, FaChevronUp, FaEye, FaDownload, FaTimes } from "react-icons/fa";
import { getContactSubmissions } from "@/lib/api";

type RequestItem = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  created_at: string;
};

export default function DemandesClients() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [sortedRequests, setSortedRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (requests.length > 0) {
      const sorted = [...requests].sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
      });
      setSortedRequests(sorted);
    }
  }, [requests, sortDirection]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const data = await getContactSubmissions(token);
        if (Array.isArray(data)) {
          setRequests(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setRequests(data.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleSortByDate = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                      Nom
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Contact
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Sujet
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Message
                    </th>
                    <th
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                      onClick={handleSortByDate}
                    >
                      <div className="inline-flex items-center gap-2">
                        Date
                        {sortDirection === "desc" ? (
                          <FaChevronDown className="h-4 w-4" />
                        ) : (
                          <FaChevronUp className="h-4 w-4" />
                        )}
                      </div>
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
                    sortedRequests.map((item) => (
                      <tr
                        key={item.id}
                        className="even:bg-gray-50 divide-x divide-gray-200 hover:bg-gray-100"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {item.name}
                          {item.company && (
                            <div className="text-xs text-gray-400">{item.company}</div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div>{item.email}</div>
                          {item.phone && <div className="text-xs text-gray-400">{item.phone}</div>}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.subject || "—"}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 max-w-md">
                          <div className="line-clamp-3">{item.message}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatDate(item.created_at)}
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
    </div>
  );
}