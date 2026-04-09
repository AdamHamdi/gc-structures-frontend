"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FaPencilAlt } from "react-icons/fa";

interface EditableSectionProps {
  title: string;
  description: string;
  onSave: (title: string, description: string) => Promise<void>;
}

interface DropdownPosition {
  horizontal: "left" | "right";
  vertical: "top" | "bottom";
}

// Hook pour calculer la position optimale du dropdown
function useDropdownPosition(buttonRef: React.RefObject<HTMLButtonElement | null>, isVisible: boolean) {
  const [position, setPosition] = useState<DropdownPosition>({ horizontal: "left", vertical: "bottom" });

  const calculatePosition = useCallback(() => {
    if (!buttonRef.current || !isVisible) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dropdownWidth = 350;
    const dropdownHeight = 300;

    // Horizontal: si pas assez de place à droite, afficher à gauche
    const horizontal: "left" | "right" = rect.right + dropdownWidth > viewportWidth ? "right" : "left";

    // Vertical: si pas assez de place en bas, afficher en haut
    const vertical: "top" | "bottom" = rect.bottom + dropdownHeight > viewportHeight ? "top" : "bottom";

    setPosition({ horizontal, vertical });
  }, [buttonRef, isVisible]);

  useEffect(() => {
    calculatePosition();
    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", calculatePosition);
    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition);
    };
  }, [calculatePosition]);

  return position;
}

// Bouton Modifier
export function EditButton({ onClick }: { onClick: () => void }) {
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

// Icône stylo avec dropdown
export function PencilEditButton({
  title,
  description,
  onSave,
}: EditableSectionProps) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDescription, setTempDescription] = useState(description);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const position = useDropdownPosition(buttonRef, isDropdownVisible);

  useEffect(() => {
    setTempTitle(title);
    setTempDescription(description);
  }, [title, description]);

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownVisible &&
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownVisible]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(tempTitle, tempDescription);
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDropdownStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      position: "absolute",
      zIndex: 9999,
    };

    if (position.horizontal === "left") {
      style.left = 0;
    } else {
      style.right = 0;
    }

    if (position.vertical === "top") {
      style.bottom = "45px";
    } else {
      style.top = "45px";
    }

    return style;
  };

  return (
    <div className="flex justify-end" style={{ zIndex: isDropdownVisible ? 9999 : 10 }}>
      <button
        ref={buttonRef}
        className="edit-icon-btn "
        title="Modifier"
        onClick={() => setDropdownVisible(!isDropdownVisible)}
      >
        <FaPencilAlt size={14} />
      </button>
      {isDropdownVisible && (
        <div ref={dropdownRef} className="drop-down-cont" style={getDropdownStyle()}>
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
              <button
                className="btn-danger height-35"
                onClick={() => setDropdownVisible(false)}
              >
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
  );
}

// Icône stylo pour les cards (titre + description)
export function CardPencilEdit({
  cardTitle,
  cardDescription,
  onSave,
}: {
  cardTitle: string;
  cardDescription: string;
  onSave: (title: string, description: string) => Promise<void>;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(cardTitle);
  const [tempDescription, setTempDescription] = useState(cardDescription);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempTitle(cardTitle);
    setTempDescription(cardDescription);
  }, [cardTitle, cardDescription]);

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownVisible &&
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownVisible]);

  // Calculer la position du dropdown après le rendu
  useEffect(() => {
    if (isDropdownVisible && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Position par défaut : juste en dessous du bouton
      let top = buttonRect.bottom + 5;
      let left = buttonRect.left;

      // Si pas assez de place en bas, afficher au-dessus
      if (buttonRect.bottom + dropdownRect.height + 10 > viewportHeight) {
        top = buttonRect.top - dropdownRect.height - 5;
      }

      // Si pas assez de place à droite, aligner à droite du bouton
      if (left + dropdownRect.width > viewportWidth) {
        left = buttonRect.right - dropdownRect.width;
      }

      // S'assurer que le popup ne sort pas à gauche
      if (left < 10) {
        left = 10;
      }

      setDropdownPosition({ top, left });
    }
  }, [isDropdownVisible]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(tempTitle, tempDescription);
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-end" style={{ zIndex: 10 }}>
      <button
        ref={buttonRef}
        className="edit-icon-btn  "
        title="Modifier"
        onClick={() => setDropdownVisible(!isDropdownVisible)}
      >
        <FaPencilAlt size={14} />
      </button>
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="drop-down-cont"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
          }}
        >
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
              <button
                className="btn-danger height-35 flex items-center justify-center"
                onClick={() => setDropdownVisible(false)}
              >
                Annuler
              </button>
              <button className="btn-blue height-35 flex items-center justify-center" onClick={handleSave}>
                {isLoading ? "En cours..." : "Sauvegarder"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Icône stylo simple (pour un seul champ)
export function PencilEditSingleButton({
  value,
  label,
  onSave,
}: {
  value: string;
  label: string;
  onSave: (value: string) => Promise<void>;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownVisible &&
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownVisible]);

  // Calculer la position du dropdown après le rendu
  useEffect(() => {
    if (isDropdownVisible && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Position par défaut : juste en dessous du bouton
      let top = buttonRect.bottom + 5;
      let left = buttonRect.left;

      // Si pas assez de place en bas, afficher au-dessus
      if (buttonRect.bottom + dropdownRect.height + 10 > viewportHeight) {
        top = buttonRect.top - dropdownRect.height - 5;
      }

      // Si pas assez de place à droite, aligner à droite du bouton
      if (left + dropdownRect.width > viewportWidth) {
        left = buttonRect.right - dropdownRect.width;
      }

      // S'assurer que le popup ne sort pas à gauche
      if (left < 10) {
        left = 10;
      }

      setDropdownPosition({ top, left });
    }
  }, [isDropdownVisible]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(tempValue);
      setDropdownVisible(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-end" style={{ zIndex: 10 }}>
      <button
        ref={buttonRef}
        className="edit-icon-btn mt-2 mr-2"
        title="Modifier"
        onClick={() => setDropdownVisible(!isDropdownVisible)}
      >
        <FaPencilAlt size={14} />
      </button>
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="drop-down-cont"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
          }}
        >
          <div className="drop-down p-5">
            <label className="fz-18">{label}</label>
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end items-center mt-3 gap-2">
              <button
                className="btn-danger height-35 flex items-center justify-center"
                onClick={() => setDropdownVisible(false)}
              >
                Annuler
              </button>
              <button className="btn-blue height-35 flex items-center justify-center" onClick={handleSave}>
                {isLoading ? "En cours..." : "Sauvegarder"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
