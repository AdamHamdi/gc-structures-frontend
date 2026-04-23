"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const useToggle = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return { isOpen, toggle };
};

export default function Header() {
  const { isOpen, toggle } = useToggle(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (isOpen) {
      toggle();
    }
  };

  return (
    <div className="sticky top-0 z-index-1000">
      <div className="header flex-center relative">
        <div className="max-width-1480-px flex items-center justify-between w-100-perc  ">
          <Link href="/">
            <Image
              loading="eager"
              src="/images/logo.webp"
              alt="logo"
              className="mx-2 w-auto h-auto"
              width={280}
              height={76} 
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          {/* Menu - visible par défaut sur desktop, contrôlé par isOpen sur mobile */}
          <div
            className={`nav-list flex items-center justify-between ${
              isOpen ? "open" : ""
            }`}
          >
            <Link
              href="/"
              className={
                pathname === "/" ? "nav-item active px-4 nav-paddin" : "nav-item px-4 nav-paddin"
              }
              onClick={handleLinkClick}
            >
              Accueil
            </Link>
            <Link
              href="/qui-nous-sommes"
              className={
                pathname.includes("qui-nous-sommes")
                  ? "nav-item active px-4 nav-paddin"
                  : "nav-item px-4 nav-paddin"
              }
              onClick={handleLinkClick}
            >
              Qui sommes nous ?
            </Link>

            <div className="page-menu exp-nav expanded-nav">
              <Link href="#" className="nav-item nav-paddin">
                Services
              </Link>
              <div className="menu-service">
                <Link
                  href="/services/genie-civil/"
                  className={
                    pathname.includes("services/genie-civil")
                      ? "nav-item-serv active"
                      : "nav-item-serv"
                  }
                  onClick={handleLinkClick}
                >
                  Génie civil
                </Link>
                <Link href="/services/structures/" className={
                    pathname.includes("services/structures")
                      ? "nav-item-serv active"
                      : "nav-item-serv"
                  }
                  onClick={handleLinkClick}>
                  Structures
                </Link>
                <Link
                  href="/services/etudes-&-assistance/"
                  className={
                    pathname.includes("services/etudes-&-assistance")
                      ? "nav-item-serv active"
                      : "nav-item-serv"
                  }
                  onClick={handleLinkClick}
                >
                  Études & Assistance
                </Link>
                <Link
                  href="/services/conseil-&-reglementation/"
                  className={
                    pathname.includes("services/conseil-&-reglementation")
                      ? "nav-item-serv active"
                      : "nav-item-serv"
                  }
                  onClick={handleLinkClick}
                >
                  Conseil & Réglementation
                </Link>
              </div>
            </div>
            <Link
              href="/references"
              className={
                pathname.includes("references")
                  ? "nav-item active px-4 nav-paddin"
                  : "nav-item px-4 nav-paddin"
              }
              onClick={handleLinkClick}
            >
              Références
            </Link>
            <Link
              href="/contact"
              className={
                pathname.includes("contact")
                  ? "nav-item active px-4 nav-paddin"
                  : "nav-item px-4 nav-paddin"
              }
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </div>

          {/* Bouton hamburger - visible uniquement sur tablette/mobile */}
          <div className="btn-bars mx-3 cursor-pointer" onClick={toggle}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
