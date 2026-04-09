import Image from "next/image";
import Link from "next/link";
export default function NosExper() {
  return (
    <div className="max-width-1518-px flex mx-auto flex-col justify-center px-4 ">
      <p className="fz-35 poppinsbold text-center clr-4 mt-5">
        Lorem ipsum dolor sit amet, consectetur
      </p>
      <br /> <br />
      <div className="flex  flex-wrap mt-5 w-100-perc">
        <div className="col-xs-100 col-sm-50 col-md-50 col-gt-md-33 px-3 mb-4">
          <div className="bg-1 rounded-25 w-100-perc  min-height-707-px">
            <div className="zoom-in rounded-15">
              <Image
                loading="eager"
                className="w-100-perc zoom-out image"
                src="/images/pensee-de-l-esquisse.webp"
                alt="GC Structures"
                width={100}
                height={409}
              />
            </div>
            <div className="p-5 ">
              <div className="flex align-center mt-5 ">
                <span className="  fz-25 poppinsbold pt-1 clr-4">
                  Lorem ipsum dolor sit amet
                </span>
              </div>
              <p className="fz-17 line-height-36 mt-5 text-center ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamc.
              </p>
            </div>
          </div>
        </div>
        <div className="col-xs-100 col-sm-50 col-md-50 col-gt-md-33 px-3 mb-4">
          <div className="bg-1 rounded-25 w-100-perc  min-height-707-px">
            <div className="zoom-in rounded-15">
              <Image
                loading="eager"
                className="w-100-perc image "
                src="/images/quatre-personnes-portant-des-casques-de-protection-inspectant-la-zone-de-construction.webp"
                alt="GC Structures"
                width={100}
                height={409}
              />
            </div>
            <div className="p-5 ">
              <div className="flex align-center mt-5 ">
                <span className="  fz-25 poppinsbold pt-1 clr-4">
                  Lorem ipsum dolor sit amet
                </span>
              </div>
              <p className="fz-17 line-height-36 mt-5 text-center ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamc.
              </p>
            </div>
          </div>
        </div>
        <div className="col-xs-100 col-sm-50 col-md-50 col-gt-md-33 px-3 mb-4">
          <div className="bg-1 rounded-25 w-100-perc  min-height-707-px">
            <div className="zoom-in rounded-15">
              <Image
                loading="eager"
                className="w-100-perc image "
                src="/images/pointant-au-croquis.webp"
                alt="GC Structures"
                width={100}
                height={409}
              />
            </div>
            <div className="p-5 ">
              <div className="flex align-center mt-5 ">
                <span className="  fz-25 poppinsbold pt-1 clr-4">
                  Lorem ipsum dolor sit amet
                </span>
              </div>
              <p className="fz-17 line-height-36 mt-5 text-center ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
