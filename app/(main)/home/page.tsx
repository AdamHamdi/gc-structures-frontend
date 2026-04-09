import { Metadata } from "next"; 
import HomeContent from "./HomeContent";

export async function generateMetadata(): Promise<Metadata> { 

  return {
  //   title: seoData.MetaTitle,
  //   description: seoData.MetaDescription,
  };
}

export default function HomePage() {
  return <HomeContent />;
}
