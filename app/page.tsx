import Carousel from "@/components/Carousel";
import Image from "next/image";
import Link from "next/link";

/* ============= React Icons ============= */

/* ============== IMAGES ================ */
import Image1 from "@/images/image1.webp";
import Image2 from "@/images/image2.webp";
import Image3 from "@/images/image3.webp";
import Image4 from "@/images/image4.webp";
import Image5 from "@/images/image5.webp";
import Image6 from "@/images/image6.webp";
import Image7 from "@/images/image7.webp";
import Image8 from "@/images/image8.webp";

const image = [
  {
    src: Image1,
    title: "Men Flag",
  },
  {
    src: Image2,
    title: "Women Flag",
  },
  {
    src: Image3,
    title: "Written Flag",
  },
  {
    src: Image4,
    title: "Style Flag",
  },
  {
    src: Image5,
    title: "Men Flag",
  },
  {
    src: Image6,
    title: "Men Flag",
  },
  {
    src: Image7,
    title: "Men Flag",
  },
  {
    src: Image8,
    title: "Men Flag",
  },
];

export default function Home() {
  return (
    <div>
      <Carousel />
      <div>
        <div className="divider mt-10">
          <div className=" uppercase text-md font-semibold tracking-widest">
            Top Categories
          </div>
        </div>
        <div className="container mx-auto flex flex-wrap justify-center lg:justify-between mt-10 mb-20 lg:mb-0">
          {image.map((val, ind) => {
            return (
              <Link href={"/"} key={ind}>
                <div className="mt-5 w-3/12 min-w-75 bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={val.src}
                      alt="Beautiful landscape"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      priority
                    />

                    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <p className="text-blue-50 text-sm font-bold text-center p-6 pb-8">
                        {val.title}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="  border-t border-b  border-[#adadad] mt-20 py-5">
        <div className="container mx-auto px-4 lg:px-0 lg:w-6/12">
          <p className="text-center font-light">
            YELLOW exists to deliver premium-quality and contemporary designs
            for style-conscious urbanites. The brand name reflects warmth,
            loyalty, and long-lasting connections. With a promise of versatile
            style, superior comfort, and a joyful shopping experience, YELLOW
            continues to brighten the everyday wardrobes of modern city life.
          </p>
        </div>
      </div>

      <div className="container mx-auto lg:w-10/12 flex justify-center lg:justify-between flex-wrap mt-20">
        <Link href={"/"}>
          <div className="mt-5 w-6/12 min-w-[350px] lg:min-w-[550px] bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer">
            <div className="relative w-full aspect-square">
              <Image
                src={Image2}
                alt="Beautiful landscape"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
                priority
              />

              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <p className="text-blue-50 text-sm font-bold text-center p-6 pb-8">
                  Watch Latest Videos in Youtube
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="mt-5 w-6/12 min-w-[350px] lg:min-w-[550px] bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer">
            <div className="relative w-full aspect-square">
              <Image
                src={Image1}
                alt="Beautiful landscape"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
                priority
              />

              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <p className="text-blue-50 text-sm font-bold text-center p-6 pb-8">
                  Our Beautiful Image in Instagram
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="container mx-auto lg:w-8/12 flex flex-wrap items-center justify-center lg:justify-between mt-20">
        <p className="text-md lg:text-2xl font-bold tracking-widest text-center lg:text-start">
          Subscribe for
          <br /> HETTY newsletters!
        </p>

        <div className="mt-4 lg:mt-0">
          <form className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Your e-mail address..."
              className="lg:w-[350px] flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white font-medium hover:bg-[#353535] cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
