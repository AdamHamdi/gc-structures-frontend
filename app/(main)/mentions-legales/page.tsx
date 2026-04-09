"use client";

import { useEffect, useState } from "react";
import { get } from "aws-amplify/api";
import { apiName, paths } from "@/lib/constants";

interface PageContent {
  PageName: string;
  sections: {
    [key: string]: {
      title?: string;
      content?: string;
    };
  };
}

export default function MentionsLegales() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const restOperation = get({
          apiName: apiName,
          path: paths.cms_page_content,
          options: { queryParams: { PageName: "mentions-legales" } },
        });
        const response = await restOperation.response;
        const jsonData = await response.body.json();
        if (jsonData && typeof jsonData === "object") {
          setPageContent(jsonData as unknown as PageContent);
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        setPageContent({
          PageName: "mentions-legales",
          sections: {
            main: {
              title: "Mentions légales",
              content: `<h2>1. Éditeur du site</h2>
<p>Le site gc-structures.com est édité par :</p>
<p><strong>GC Structures</strong><br/>
Bureau d'études en génie civil et structures<br/>
Adresse : [Adresse à compléter]<br/>
Téléphone : [Numéro à compléter]<br/>
Email : contact@gc-structures.com<br/>
SIRET : [Numéro à compléter]</p>

<h2>2. Directeur de la publication</h2>
<p>[Nom du directeur de publication à compléter]</p>

<h2>3. Hébergeur</h2>
<p>Le site est hébergé par :<br/>
Amazon Web Services (AWS)<br/>
Amazon Web Services, Inc.<br/>
P.O. Box 81226<br/>
Seattle, WA 98108-1226<br/>
États-Unis</p>

<h2>4. Propriété intellectuelle</h2>
<p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>

<h2>5. Données personnelles</h2>
<p>Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous à : contact@gc-structures.com</p>

<h2>6. Cookies</h2>
<p>Ce site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez paramétrer votre navigateur pour refuser les cookies ou être averti lorsqu'un cookie est envoyé.</p>

<h2>7. Limitation de responsabilité</h2>
<p>GC Structures s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger le contenu à tout moment et sans préavis. Toutefois, GC Structures ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.</p>`,
            },
          },
        });
      }
    };
    fetchContent();
  }, []);

  const content = pageContent?.sections?.main;

  return (
    <div className="bg-3 min-h-screen">
      <div className="max-width-1150-px mx-auto py-24 px-4">
        <h1 className="fz-45 poppinsbold clr-4 mb-10">
          {content?.title || "Mentions légales"}
        </h1>
        <div
          className="legal-content fz-17 clr-4 line-height-36"
          dangerouslySetInnerHTML={{
            __html: content?.content || "Chargement...",
          }}
        />
      </div>
    </div>
  );
}
