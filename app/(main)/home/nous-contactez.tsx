import Image from "next/image";
import Link from "next/link";

interface ContactUsProps {
  content?: {
    title?: string;
    description?: string;
  };
}

export default function ContactUs({ content }: ContactUsProps) {
  const title = content?.title || "Lorem ipsum dolor sit amet, consectetur";
  const description = content?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.";

  return (
    <div className="   py-24 flex-center ">
      <div className="max-width-1150-px flex items-center flex-wrap justify-center px-4">
        <div className="col-gt-sm-60 col-sm-60 col-xs-100 mb-5">
          <Image
            loading="eager"
            src="/images/Structures.webp"
            alt="GC Structures"
            className=" "
            width={389}
            height={86} 
            style={{ width: "auto", height: "auto" }}
          />
          <p className="fz-35 poppinsbold clr-4 mt-5">
            {title}
          </p>
          <p className="fz-17 mt-8 w-80-perc clr-4 line-height-36">
            {description}
          </p>
          <div className="  mt-10">
            <Link href="#" className=" bg-2 btn clr-1">
              Contactez-Nous !
            </Link>
          </div>
        </div>

        <div className="col-gt-sm-40 col-sm-40 col-xs-100 flex justify-end mb-5">
          <Image
            loading="eager"
            src="/images/Image-femme.webp"
            alt="GC Structures"
            className=" "
            width={425}
            height={597}
          />
        </div>
      </div>
    </div>
  );
}
