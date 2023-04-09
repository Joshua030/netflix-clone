import Image from "next/image";
import { useState } from "react";
import styles from "./card.module.css";
import { motion } from "framer-motion";

interface props {
  imgUrl: string;
  size: string;
  id: string;
}

const Card = ({
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80",
  size = "medium",
  id,
}: props) => {
  type ClassMap = {
    [key: string]: string;
    large: string;
    medium: string;
    small: string;
  };

  const classMap: ClassMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const [imgSrc, setimgSrc] = useState<string>(imgUrl);

  const handleOnError = (): void => {
    setimgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80"
    );
  };

  const scale:
    | {
        scaleY: number;
        scale?: undefined;
      }
    | {
        scale: number;
        scaleY?: undefined;
      } = id === "0" ? { scaleY: 1.1 } : { scale: 1.1 };

  return (
    <div className={styles.container}>
      <motion.div
        className={`${classMap[size]} ${styles.imgMotionWrapper}`}
        whileHover={scale}
      >
        <Image
          src={imgSrc}
          alt="Image"
          fill
          className={styles.cardImg}
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
