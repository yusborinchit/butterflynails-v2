import * as motion from "motion/react-client";
import Image from "next/image";
import HeroImage1 from "~/assets/hero-1.webp";
import HeroImage2 from "~/assets/hero-2.webp";

export default function HeroImages() {
  return (
    <div className="absolute inset-0 -z-10 2xl:mx-auto 2xl:max-w-[1170px]">
      <motion.div
        initial={{ opacity: 0, translateX: "-10rem" }}
        animate={{ opacity: 1, translateX: "0rem" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-25 left-0 max-h-[500px] w-full place-items-center sm:bottom-0 sm:left-8 sm:max-w-[300px] 2xl:-left-25"
      >
        <Image
          src={HeroImage1}
          priority={true}
          alt="Unas manos con las uñas pintadas y una mariposa posando en ellas."
          className="mx-auto max-w-[300px] object-contain"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateX: "10rem" }}
        animate={{ opacity: 1, translateX: "0rem" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute right-8 bottom-0 hidden max-h-[500px] max-w-[300px] sm:inline 2xl:-right-25"
      >
        <Image
          src={HeroImage2}
          priority={true}
          alt="Una pila de botellas de esmalte."
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
