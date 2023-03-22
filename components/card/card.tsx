import Image from "next/image";
import styles from "./card.module.css";

interface props {
  imgUrl: string;
  size: string;
}

const Card = ({ imgUrl, size }: props) => {
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

  return (
    <div className={styles.container}>
      CARD
      <div className={classMap[size]}>
        <Image src={imgUrl} alt="Image" fill className={styles.cardImg}/>
      </div>
    </div>
  );
};

export default Card;
