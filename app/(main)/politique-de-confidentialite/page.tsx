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

export default function PolitiqueConfidentialite() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const restOperation = get({
          apiName: apiName,
          path: paths.cms_page_content,
          options: { queryParams: { PageName: "politique-confidentialite" } },
        });
        const response = await restOperation.response;
        const jsonData = await response.body.json();
        if (jsonData && typeof jsonData === "object") {
          setPageContent(jsonData as unknown as PageContent);
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        setPageContent({
          PageName: "politique-confidentialite",
          sections: {
            main: {
              title: "Politique de confidentialité",
              content: `<h2>1. Collecte des informations</h2>
<p>Nous recueillons des informations lorsque vous vous inscrivez sur notre site, passez une commande, remplissez un formulaire ou nous contactez. Les informations recueillies incluent votre nom, votre adresse e-mail, numéro de téléphone et/ou adresse postale.</p>

<h2>2. Utilisation des informations</h2>
<p>Les informations que nous recueillons sont utilisées pour :</p>
<ul>
<li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
<li>Améliorer notre site web</li>
<li>Améliorer le service client et vos besoins de prise en charge</li>
<li>Vous contacter par e-mail ou téléphone</li>
</ul>

<h2>3. Protection des informations</h2>
<p>Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.</p>

<h2>4. Cookies</h2>
<p>Nos cookies améliorent l'accès à notre site et identifient les visiteurs réguliers. En outre, nos cookies améliorent l'expérience utilisateur en suivant et en ciblant ses intérêts. Vous pouvez à tout moment paramétrer votre navigateur pour refuser les cookies.</p>

<h2>5. Vos droits</h2>
<p>Conformément au RGPD, vous disposez des droits suivants :</p>
<ul>
<li>Droit d'accès à vos données personnelles</li>
<li>Droit de rectification de vos données</li>
<li>Droit à l'effacement de vos données</li>
<li>Droit à la portabilité de vos données</li>
<li>Droit d'opposition au traitement de vos données</li>
</ul>

<h2>6. Contact</h2>
<p>Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse : contact@gc-structures.com</p>`,
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
          {content?.title || "Politique de confidentialité"}
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
