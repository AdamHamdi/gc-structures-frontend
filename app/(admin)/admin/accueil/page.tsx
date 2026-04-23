"use client";


import { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";
import Loader from "../../components/Loader";
import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";
import { CardPencilEdit } from "../../components/EditableSection";
import { getCmsPage, updateCmsSection } from "@/lib/api";

interface SectionContent {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

interface PageContent {
  PageName: string;
  sections: {
    [key: string]: SectionContent;
  };
}

// Bouton Modifier
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

// Section Hero avec édition
function HeroSection({
  content,
  onSave,
}: {
  content: SectionContent;
  onSave: (content: SectionContent) => Promise<void>;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(content?.title || "Concevoir - Calculer - Construire");
  const [tempSubtitle, setTempSubtitle] = useState(content?.subtitle || "avec précision!");

  useEffect(() => {
    setTempTitle(content?.title || "Concevoir - Calculer - Construire");
    setTempSubtitle(content?.subtitle || "avec précision!");
  }, [content]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({ ...content, title: tempTitle, subtitle: tempSubtitle });
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="accueil">
      <div className="text-center line-height-81 fz-55 clr-1 poppinsbold">
        <span>{tempTitle}</span> <br />
        <span className="bg-2 p-2 rounded-5">{tempSubtitle}</span>
      </div>
      <br /><br />
      <div className="flex-center mt-5">
        <button className="bg-2 btn clr-1">Contactez-Nous !</button>
      </div>
      <div className="flex-center mt-5">
        <EditButton onClick={() => setDropdownVisible(!isDropdownVisible)} />
        {isDropdownVisible && (
          <div className="drop-down-cont">
            <div className="drop-down p-5">
              <label className="fz-18">Titre principal</label>
              <textarea
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                rows={2}
              />
              <label className="fz-18 mt-3">Sous-titre</label>
              <textarea
                value={tempSubtitle}
                onChange={(e) => setTempSubtitle(e.target.value)}
                rows={1}
              />
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
  );
}

// Section Contact avec édition
function ContactUsSection({
  content,
  onSave,
}: {
  content: SectionContent;
  onSave: (content: SectionContent) => Promise<void>;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(content?.title || "Lorem ipsum dolor sit amet, consectetur");
  const [tempDescription, setTempDescription] = useState(content?.description || "Lorem ipsum dolor sit amet...");

  useEffect(() => {
    setTempTitle(content?.title || "Lorem ipsum dolor sit amet, consectetur");
    setTempDescription(content?.description || "Lorem ipsum dolor sit amet...");
  }, [content]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({ ...content, title: tempTitle, description: tempDescription });
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-24 flex-center">
      <div className="max-width-1150-px flex items-center flex-wrap justify-center px-4">
        <div className="col-gt-sm-60 col-sm-60 col-xs-100 mb-5">
          <Image
            loading="eager"
            src="/images/Structures.webp"
            alt="GC Structures"
            width={389}
            height={86} 
            style={{ width: "auto", height: "auto" }}
          />
          <p className="fz-35 poppinsbold clr-4 mt-5">{tempTitle}</p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">{tempDescription}</p>
          <div className="mt-10">
            <Link href="#" className="bg-2 btn clr-1">Contactez-Nous !</Link>
          </div>
          <div className="mt-5">
            <EditButton onClick={() => setDropdownVisible(!isDropdownVisible)} />
            {isDropdownVisible && (
              <div className="drop-down-cont">
                <div className="drop-down p-5">
                  <label className="fz-18">Titre</label>
                  <textarea
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    rows={2}
                  />
                  <label className="fz-18 mt-3">Description</label>
                  <textarea
                    value={tempDescription}
                    onChange={(e) => setTempDescription(e.target.value)}
                    rows={4}
                  />
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
        <div className="col-gt-sm-40 col-sm-40 col-xs-100 flex justify-end mb-5">
          <Image
            loading="eager"
            src="/images/Image-femme.webp"
            alt="GC Structures"
            width={425}
            height={597}
          />
        </div>
      </div>
    </div>
  );
}

// Section Pourquoi nous choisir avec édition
interface WhyChooseUsItem {
  name?: string;
  description?: string;
}

interface WhyChooseUsContent extends SectionContent {
  items?: WhyChooseUsItem[];
}

function WhyChooseUsSection({
  content,
  onSave,
  onSaveItem,
}: {
  content: WhyChooseUsContent;
  onSave: (content: WhyChooseUsContent) => Promise<void>;
  onSaveItem: (index: number, name: string, description: string) => Promise<void>;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(content?.title || "Pourquoi nous choisir ?");

  useEffect(() => {
    setTempTitle(content?.title || "Pourquoi nous choisir ?");
  }, [content]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({ ...content, title: tempTitle });
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Valeurs par défaut pour les items
  const defaultItems: WhyChooseUsItem[] = [
    { name: "Expertise et polyvalence", description: "Notre bureau d'études réunit des ingénieurs et experts spécialisés dans tous les domaines du génie civil et des structures (béton, acier, bois, ouvrages d'art, génie urbain)." },
    { name: "Approche sur mesure et innovation", description: "Chaque projet est unique, c'est pourquoi nous proposons des solutions adaptées, optimisées et innovantes." },
    { name: "Qualité, sécurité et conformité", description: "GC Structures s'engage à respecter les exigences de qualité les plus élevées." },
    { name: "Accompagnement complet et réactif", description: "De l'étude de faisabilité à la réception finale, nous accompagnons nos clients à chaque étape." },
  ];

  const items = content?.items && content.items.length > 0 ? content.items : defaultItems;

  const icons = ["icon-check-square", "icon-check-list", "icon-building", "icon-calendar-check"];

  return (
    <div className="why-choose-us">
      <div className="max-width-1518-px flex mx-auto flex-col justify-center px-4">
        <p className="fz-35 poppinsbold clr-4 text-center mt-5">{tempTitle}</p>
        <div className="flex-center mt-3">
          <EditButton onClick={() => setDropdownVisible(!isDropdownVisible)} />
          {isDropdownVisible && (
            <div className="drop-down-cont">
              <div className="drop-down p-5">
                <label className="fz-18">Titre de la section</label>
                <textarea
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  rows={1}
                />
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
        <br /><br />
        <div className="flex flex-wrap mt-5 w-100-perc">
          {items.map((item, index) => (
            <div key={index} className="col-xs-100 col-sm-50 col-md-50 col-lg-33 col-xl-33 col-xxl-25 px-2 mb-4">
              <div className="bg-1 rounded-25 w-100-perc p-8 min-height-588-px z-in relative">
                <div className="flex justify-end pr-3">
                  <CardPencilEdit
                    cardTitle={item.name || ""}
                    cardDescription={item.description || ""}
                    onSave={(name, description) => onSaveItem(index, name, description)}
                  />
                </div>
                <div className="flex-center flex-col">
                  <div className="relative">
                    <svg width="40" height="40" className="relative z-index-1">
                      <use href={`/icons/icons.svg#${icons[index % icons.length]}`} fill="#28a951"></use>
                    </svg>
                    <div className="height-34-px bg-6 w-34-px absolute rounded-17 z-index-0 top--10 right--23"></div>
                  </div>
                  <p className="mt-8 fz-20 clr-4 poppinsbold text-center">{item.name}</p>
                  <p className="fz-17 clr-4 line-height-36 mt-8 text-center">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Section Ensemble avec édition
function EnsembleSection({
  content,
  onSave,
}: {
  content: SectionContent;
  onSave: (content: SectionContent) => Promise<void>;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(content?.title || "Construisons ensemble des structures solides et durables");
  const [tempDescription, setTempDescription] = useState(content?.description || "De l'étude à la réalisation, notre équipe vous accompagne à chaque étape pour garantir la réussite de vos projets");

  useEffect(() => {
    setTempTitle(content?.title || "Construisons ensemble des structures solides et durables");
    setTempDescription(content?.description || "De l'étude à la réalisation, notre équipe vous accompagne à chaque étape pour garantir la réussite de vos projets");
  }, [content]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({ ...content, title: tempTitle, description: tempDescription });
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center flex-col py-24 px-4">
      <p className="fz-60 poppinsbold text-center clr-4 mt-5 px-4">
        {tempTitle.split(" ").slice(0, 3).join(" ")} <br />
        {tempTitle.split(" ").slice(3).join(" ")}
      </p>
      <br /><br /><br />
      <p className="fz-17 text-center clr-4">{tempDescription}</p>
      <br /><br /><br />
      <div className="w-fit">
        <button className="bg-2 w-fit btn clr-1">Contactez-Nous !</button>
      </div>
      <div className="flex-center mt-5">
        <EditButton onClick={() => setDropdownVisible(!isDropdownVisible)} />
        {isDropdownVisible && (
          <div className="drop-down-cont">
            <div className="drop-down p-5">
              <label className="fz-18">Titre</label>
              <textarea
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                rows={2}
              />
              <label className="fz-18 mt-3">Description</label>
              <textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                rows={3}
              />
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
  );
}

// Section Expertises avec édition
interface ExpertiseItem {
  name?: string;
  number?: string;
  points?: string[];
}

interface ExpertisesContent extends SectionContent {
  items?: ExpertiseItem[];
}

function ExpertisesSection({
  content,
  onSave,
  onSaveItem,
}: {
  content: ExpertisesContent;
  onSave: (content: ExpertisesContent) => Promise<void>;
  onSaveItem: (index: number, name: string, points: string[]) => Promise<void>;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(content?.title || "Nos expertises pour vos projets");

  useEffect(() => {
    setTempTitle(content?.title || "Nos expertises pour vos projets");
  }, [content]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({ ...content, title: tempTitle });
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Valeurs par défaut pour les expertises
  const defaultItems: ExpertiseItem[] = [
    { name: "Conseil en amont", number: "01", points: ["Études de faisabilité adaptées à vos besoins", "Pré-dimensionnement pour anticiper les solutions techniques", "Assistance à maîtrise d'ouvrage (AMOA)"] },
    { name: "Conception et Maîtrise d'œuvre", number: "02", points: ["Études de structures béton fiables et performantes", "Conception et optimisation de charpentes métalliques et bois", "Réalisation de plans généraux"] },
    { name: "Réalisation et Suivi d'exécution", number: "03", points: ["Calculs précis des ouvrages béton", "Études sismiques et dynamiques", "Suivi de chantier de A à Z"] },
  ];

  const items = content?.items && content.items.length > 0 ? content.items : defaultItems;

  const images = [
    "/images/gros-plan-hommes-regarder-plan.webp",
    "/images/vue-laterale-de-l-homme-avec-blueprint.webp",
    "/images/femme-travaillant-avec-une-grande-regle-et-un-stylo-sur-la-table.webp",
  ];

  return (
    <div className="experties">
      <div className="max-width-1518-px flex mx-auto flex-col justify-center">
        <p className="fz-35 poppinsbold text-center clr-4 mt-5">{tempTitle}</p>
        <div className="flex-center mt-3">
          <EditButton onClick={() => setDropdownVisible(!isDropdownVisible)} />
          {isDropdownVisible && (
            <div className="drop-down-cont">
              <div className="drop-down p-5">
                <label className="fz-18">Titre de la section</label>
                <textarea
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  rows={1}
                />
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
        <br /><br />
        <div className="flex flex-wrap mt-5 w-100-perc">
          {items.map((item, index) => (
            <div key={index} className="col-xs-100 col-sm-50 col-md-50 col-gt-md-33 px-3 mb-4">
              <div className="bg-1 rounded-25 w-100-perc p-5 min-height-707-px relative">
                <div className="flex justify-end pr-3">
                  <CardPencilEdit
                    cardTitle={item.name || ""}
                    cardDescription={(item.points || []).join("\n")}
                    onSave={(name, description) => onSaveItem(index, name, description.split("\n").filter(p => p.trim()))}
                  />
                </div>
                <div className="zoom-in rounded-15">
                  <Image
                    loading="eager"
                    className="w-100-perc zoom-out image"
                    src={images[index % images.length]}
                    alt="GC Structures"
                    width={100}
                    height={299}
                  />
                </div>
                <div className="flex align-center mt-5">
                  <div className="height-34-px bg-6 w-34-px mr-3 flex-center rounded-17">
                    <span className="clr-2 fz-20 poppinsbold">{item.number || `0${index + 1}`}</span>
                  </div>
                  <span className="clr-4 fz-20 poppinsbold pt-1">{item.name}</span>
                </div>
                <ul className="fz-17 line-height-36 mt-5">
                  {(item.points || []).map((point, idx) => (
                    <li key={idx} className="fz-17 clr-4"><strong>•</strong> {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Section Réalisations avec édition
function RealisationsSection({
  content,
  onSave,
}: {
  content: SectionContent;
  onSave: (content: SectionContent) => Promise<void>;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(content?.title || "Notre objectif :");
  const [tempDescription, setTempDescription] = useState(content?.description || "vous offrir un service complet, de la conception à la réalisation, avec un haut niveau d'expertise et de fiabilité");

  useEffect(() => {
    setTempTitle(content?.title || "Notre objectif :");
    setTempDescription(content?.description || "vous offrir un service complet, de la conception à la réalisation, avec un haut niveau d'expertise et de fiabilité");
  }, [content]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({ ...content, title: tempTitle, description: tempDescription });
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="experties px-4">
      <div className="max-width-1518-px flex mx-auto flex-col justify-center px-4 mt-8">
        <div className="flex items-end justify-center">
          <Image
            loading="eager"
            src="/images/arrow.webp"
            alt="GC Structures"
            width={120}
            height={96}
            
            style={{ width: "auto", height: "auto" }}
          />
          <span className="clr-2 fz-30 poppinsbold mb-3"> {tempTitle}</span>
        </div>
        <p className="fz-20 text-center clr-4 mt-8">{tempDescription}</p>
        <div className="flex-center mt-5">
          <EditButton onClick={() => setDropdownVisible(!isDropdownVisible)} />
          {isDropdownVisible && (
            <div className="drop-down-cont">
              <div className="drop-down p-5">
                <label className="fz-18">Titre</label>
                <textarea
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  rows={1}
                />
                <label className="fz-18 mt-3">Description</label>
                <textarea
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                  rows={3}
                />
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

        <div className="py-24">
          <p className="fz-35 poppinsbold clr-4 text-center mt-5">Réalisations</p>
          <br /><br />
          <div className="flex-center flex-wrap mt-5 w-100-perc">
            <div className="col-xs-100 col-sm-100 col-md-100 col-gt-md-40 p-3 height-671-px">
              <div className="zoom-in rounded-15 height-100-perc">
                <Image
                  loading="eager"
                  className="w-100-perc height-100-perc zoom-out image"
                  src="/images/batiment-en-beton-symetrique.webp"
                  alt="GC Structures"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="col-xs-100 col-sm-100 col-md-100 col-gt-md-60 px-3 mt-2">
              <div className="flex flex-wrap">
                <div className="col-xs-100 col-sm-50 col-gt-sm-50 p-3">
                  <div className="zoom-in rounded-15">
                    <Image
                      loading="eager"
                      className="w-100-perc image fit-cover"
                      src="/images/parc-industriel-batiment-d-usine-entrepot.webp"
                      alt="GC Structures"
                      width={100}
                      height={323}
                    />
                  </div>
                </div>
                <div className="col-xs-100 col-sm-50 col-gt-sm-50 p-3">
                  <div className="zoom-in rounded-15">
                    <Image
                      loading="eager"
                      className="w-100-perc image"
                      src="/images/construction-de-batiments-de-nouveaux-gratte-ciel.webp"
                      alt="GC Structures"
                      width={100}
                      height={323}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mb-3">
                <div className="col-xs-100 col-sm-50 col-gt-sm-50 p-3">
                  <div className="zoom-in rounded-15">
                    <Image
                      loading="eager"
                      className="w-100-perc image"
                      src="/images/chantier-de-construction.webp"
                      alt="GC Structures"
                      width={100}
                      height={323}
                    />
                  </div>
                </div>
                <div className="col-xs-100 col-sm-50 col-gt-sm-50 p-3">
                  <div className="zoom-in rounded-15">
                    <Image
                      loading="eager"
                      className="w-100-perc image"
                      src="/images/silo-agricole.webp"
                      alt="GC Structures"
                      width={100}
                      height={323}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100-perc flex-center mt-5">
          <button className="bg-2 btn clr-1">Notre Portfolio !</button>
        </div>
      </div>
    </div>
  );
}

// Section Contact avec édition
function ContactSection({
  content,
  onSave,
}: {
  content: SectionContent;
  onSave: (content: SectionContent) => Promise<void>;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(content?.title || "Nous sommes prêts à vous aider à tout moment");
  const [tempDescription, setTempDescription] = useState(content?.description || "Notre équipe est toujours là pour vous guider et rendre votre projet.");

  useEffect(() => {
    setTempTitle(content?.title || "Nous sommes prêts à vous aider à tout moment");
    setTempDescription(content?.description || "Notre équipe est toujours là pour vous guider et rendre votre projet.");
  }, [content]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({ ...content, title: tempTitle, description: tempDescription });
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-24 mb-18 flex-center">
      <div className="max-width-1518-px flex mt-10 flex-wrap justify-center">
        <div className="col-gt-sm-45 col-sm-100 col-xs-100 mb-5 px-4">
          <p className="fz-35 poppinsbold line-height-59">{tempTitle}</p>
          <p className="fz-17 mt-8 clr-4 line-height-36">{tempDescription}</p>
          <div className="mt-5">
            <EditButton onClick={() => setDropdownVisible(!isDropdownVisible)} />
            {isDropdownVisible && (
              <div className="drop-down-cont">
                <div className="drop-down p-5">
                  <label className="fz-18">Titre</label>
                  <textarea
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    rows={2}
                  />
                  <label className="fz-18 mt-3">Description</label>
                  <textarea
                    value={tempDescription}
                    onChange={(e) => setTempDescription(e.target.value)}
                    rows={2}
                  />
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
          <Image
            loading="eager"
            src="/images/contact-gc-structures.webp"
            alt="GC Structures"
            className="w-95-perc mt-5"
            width={100}
            height={555}
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        <div className="col-gt-sm-55 col-sm-100 col-xs-100 px-3 mb-4">
          <div className="bg-1 w-100-perc rounded-25 p-8">
            <p className="fz-20 clr-4 line-height-36">Contactez-Nous !</p>
            <p className="fz-35 poppinsbold line-height-36 mt-3">Soumettre une demande</p>
            <div className="mt-10 form">
              <div className="w-100-perc mb-3">
                <label htmlFor="nom" className="fz-17">Nom</label>
                <input type="text" id="nom" className="form-control" disabled />
              </div>
              <div className="w-100-perc mb-3">
                <label htmlFor="tel" className="fz-17">Téléphone</label>
                <input type="text" id="tel" className="form-control" disabled />
              </div>
              <div className="w-100-perc mb-3">
                <label htmlFor="email" className="fz-17">Email</label>
                <input type="text" id="email" className="form-control" disabled />
              </div>
              <div className="w-100-perc mb-3">
                <label htmlFor="msg" className="fz-17">Message</label>
                <textarea className="form-control" id="msg" rows={8} disabled></textarea>
              </div>
              <br />
              <div className="flex-center">
                <button className="bg-2 btn clr-1" disabled>Envoyer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page principale Admin Accueil
export default function AccueilAdminPage() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const data = await getCmsPage("home");
      setPageContent(data);
    } catch {
      setPageContent({
        PageName: "home",
        sections: {
          hero: { title: "Concevoir - Calculer - Construire", subtitle: "précision!" },
          contactUs: { title: "Lorem ipsum dolor sit amet, consectetur", description: "Lorem ipsum..." },
          whyChooseUs: { title: "Pour quoi nous choisir ?" },
          ensemble: { title: "Construisons ensemble des structures solides et durables", description: "De l'étude à la réalisation, notre équipe vous accompagne à chaque étape pour garantir la réussite de vos projets" },
          expertises: { title: "Nos expertises pour vos projets" },
          realisations: { title: "Notre objectif :", description: "vous offrir un service complet, de la conception à la réalisation, avec un haut niveau d'expertise et de fiabilité" },
          contact: { title: "Nous sommes prêts à vous aider à tout moment", description: "Notre équipe est toujours là pour vous guider et rendre votre projet." },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (sectionId: string, newContent: SectionContent) => {
    try {
      const token = localStorage.getItem("token") || "";
      await updateCmsSection(token, "home", sectionId, { id: sectionId, ...newContent });
      setPageContent((prev) => prev ? { ...prev, sections: { ...prev.sections, [sectionId]: newContent } } : prev);
      toast.show("success", "Succès", "Section mise à jour avec succès !");
    } catch {
      toast.show("error", "Erreur", "Échec de la sauvegarde.");
      throw new Error("Échec de la sauvegarde");
    }
  };

  const handleSaveWhyChooseUsItem = async (index: number, name: string, description: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      const currentContent = pageContent?.sections?.whyChooseUs || {};
      const currentItems = (currentContent as any).items || [];
      const updatedItems = [...currentItems];
      updatedItems[index] = { ...updatedItems[index], name, description };
      const newContent = { ...currentContent, id: "whyChooseUs", items: updatedItems };
      await updateCmsSection(token, "home", "whyChooseUs", newContent);
      setPageContent((prev) => prev ? { ...prev, sections: { ...prev.sections, whyChooseUs: newContent } } : prev);
      toast.show("success", "Succès", "Contenu mis à jour avec succès !");
    } catch {
      toast.show("error", "Erreur", "Échec de la sauvegarde.");
      throw new Error("Échec de la sauvegarde");
    }
  };

  const handleSaveExpertiseItem = async (index: number, name: string, points: string[]) => {
    try {
      const token = localStorage.getItem("token") || "";
      const currentContent = pageContent?.sections?.expertises || {};
      const currentItems = (currentContent as any).items || [];
      const updatedItems = [...currentItems];
      updatedItems[index] = { ...updatedItems[index], name, points };
      const newContent = { ...currentContent, id: "expertises", items: updatedItems };
      await updateCmsSection(token, "home", "expertises", newContent);
      setPageContent((prev) => prev ? { ...prev, sections: { ...prev.sections, expertises: newContent } } : prev);
      toast.show("success", "Succès", "Contenu mis à jour avec succès !");
    } catch {
      toast.show("error", "Erreur", "Échec de la sauvegarde.");
      throw new Error("Échec de la sauvegarde");
    }
  };

  if (loading) return <Loader inline />;

  return (
    <div>


      {/* Section Hero */}
      <HeroSection
        content={pageContent?.sections?.hero || {}}
        onSave={(content) => handleSaveSection("hero", content)}
      />

      <div className="bg-3">
        {/* Section Contact Us */}
        <ContactUsSection
          content={pageContent?.sections?.contactUs || {}}
          onSave={(content) => handleSaveSection("contactUs", content)}
        />

        {/* Section Pourquoi nous choisir */}
        <WhyChooseUsSection
          content={pageContent?.sections?.whyChooseUs || {}}
          onSave={(content) => handleSaveSection("whyChooseUs", content)}
          onSaveItem={handleSaveWhyChooseUsItem}
        />

        {/* Section Ensemble */}
        <EnsembleSection
          content={pageContent?.sections?.ensemble || {}}
          onSave={(content) => handleSaveSection("ensemble", content)}
        />

        {/* Section Expertises */}
        <ExpertisesSection
          content={pageContent?.sections?.expertises || {}}
          onSave={(content) => handleSaveSection("expertises", content)}
          onSaveItem={handleSaveExpertiseItem}
        />

        {/* Section Réalisations */}
        <RealisationsSection
          content={pageContent?.sections?.realisations || {}}
          onSave={(content) => handleSaveSection("realisations", content)}
        />

        {/* Section Contact */}
        <ContactSection
          content={pageContent?.sections?.contact || {}}
          onSave={(content) => handleSaveSection("contact", content)}
        />
      </div>
    </div>
  );
}
