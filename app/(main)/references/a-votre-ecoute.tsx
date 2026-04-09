import Link from "next/link";
export default function Ecoute() {
  return (
    <div className="flex-center flex-col py-10 px-4">
      <p className="fz-60 poppinsbold text-center clr-4 mt-5 px-4">
        Faites de vos idées une réalité <br />
        avec une équipe à votre écoute
      </p>
      <br />
      <br />
      <br />
      <p className="fz-17 text-center clr-4">
        Bénéficiez d&apos;un accompagnement sur mesure, pensé pour donner vie à
        vos projets avec clarté, efficacité et sérénité.
      </p>
      <br />
      <br />
      <br />
      <div className="w-fit">
        <Link href="tel:12365125124" className=" bg-2 w-fit btn clr-1">
          <div className="flex flex-wrap items-center justify-center col-xs-100">
            <svg width="27" height="27" fill="#fff" className="">
              <use href="/icons/icons.svg#icon-phone"></use>
            </svg>

            <span className=" fz-23 clr-1 ml-4">12 365 125 124</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
