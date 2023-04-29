// import { Video } from "../../Types";
import Link from "next/link";
import Card from "./card";
import styles from "./sectionCards.module.css";

interface props {
  title: string;
  videos: Video[];
  size: string;
}

const SectionCards = ({ title, videos = [], size }: props) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map(({ title, imgUrl, id }) => {
          return (
            <Link href={`/video/${id}`} key={id}>
              <Card imgUrl={imgUrl} size={size} id={id} />
            </Link>
          );
        })}
        {/*       
        <Card 
        imgUrl="/static/intestellar.jpg"
        size="large"
        id= {1}
        />
        <Card 
        imgUrl="/static/intestellar.jpg"
        size="large"
        id= {2}
        />
        <Card 
        imgUrl="/static/intestellar.jpg"
        size="large"
        id= {3}
        />
        <Card 
        imgUrl="/static/intestellar.jpg"
        size="large"
        id= {4}
        /> */}
      </div>
    </section>
  );
};

export default SectionCards;
