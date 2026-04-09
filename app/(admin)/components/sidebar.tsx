"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { FaCog,FaBook,FaTools,FaColumns,FaBuilding,FaFileContract,FaGavel,FaShieldAlt, FaUsers,FaProjectDiagram, FaHome, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';

import Image from "next/image";

const customerSection = [
  {
    name: "Demandes clients",
    href: "/admin/demandes-clients",
    icon: FaEnvelope,
  },
];

const navigation = [
  {
    name: "Paramétrage",
    href: "/admin/liste-config",
    icon: FaCog,
  },
];

const contentPages = [
  {
    id: 1,
    name: "Accueil",
    href: "/admin/accueil",
    icon: FaHome,
  },
  {
    id: 2,
    name: "Qui sommes-nous",
    href: "/admin/qui-nous-sommes",
    icon: FaUsers,
  },
  {
    id: 3,
    name: "Génie Civil",
    href: "/admin/genie-civil",
    icon: FaBuilding,
  },
  {
    id: 4,
    name: "Structures",
    href: "/admin/structures",
    icon: FaProjectDiagram,
  },
  {
    id: 5,
    name: "Études & Assistance",
    href: "/admin/etudes-assistance",
    icon: FaBook,
  },
  {
    id: 6,
    name: "Conseil & Réglementation",
    href: "/admin/conseil-reglementation",
    icon: FaGavel,
  },
  {
    id: 7,
    name: "Références",
    href: "/admin/references",
    icon: FaTools,
  },
  {
    id: 8,
    name: "Footer",
    href: "/admin/footer",
    icon: FaColumns,
  },
];

const legalPages = [
  {
    id: 1,
    name: "Politique de confidentialité",
    href: "/admin/politique-confidentialite",
    icon: FaShieldAlt,
  },
  {
    id: 2,
    name: "Mentions légales",
    href: "/admin/mentions-legales",
    icon: FaFileContract,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut({ global: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-4 pb-4" style={{ backgroundColor: "#1e293b" }}>
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-center py-4">
          <Image
            src="/images/logo-ad.png"
            alt="GC Structures"
            width={180}
            height={53}
            className="object-contain"
          />
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            {/* Section Demandes clients */}
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Clients
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {customerSection.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        pathname.includes(item.href)
                          ? "bg-green-600 text-white"
                          : "text-gray-300 hover:text-white hover:bg-green-600",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Section SEO */}
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                SEO
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        pathname.includes(item.href)
                          ? "bg-green-600 text-white"
                          : "text-gray-300 hover:text-white hover:bg-green-600",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Section Gestion de contenu */}
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Gestion de contenu
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {contentPages.map((page) => (
                  <li key={page.id}>
                    <Link
                      href={page.href}
                      className={classNames(
                        pathname.includes(page.href)
                          ? "bg-green-600 text-white"
                          : "text-gray-300 hover:text-white hover:bg-green-600",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                        <page.icon className="h-5 w-5" />
                      </span>
                      <span className="truncate">{page.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Section Pages légales */}
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Pages légales
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {legalPages.map((page) => (
                  <li key={page.id}>
                    <Link
                      href={page.href}
                      className={classNames(
                        pathname.includes(page.href)
                          ? "bg-green-600 text-white"
                          : "text-gray-300 hover:text-white hover:bg-green-600",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                        <page.icon className="h-5 w-5" />
                      </span>
                      <span className="truncate">{page.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Déconnexion */}
            <li className="mt-auto">
              <button
                onClick={handleSignOut}
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-300 hover:bg-green-600 hover:text-white cursor-pointer w-full"
              >
                <FaSignOutAlt
                  className="h-6 w-6 shrink-0 text-gray-300 group-hover:text-white"
                  aria-hidden="true"
                />
                Déconnexion
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
