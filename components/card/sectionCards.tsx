import Card from "./card";
import styles from "./sectionCards.module.css"

interface props {
  title: string;
  videos:string[];
}

const SectionCards = ({title,videos}:props) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        <Card 
        imgUrl="/static/intestellar.jpg"
        size="large"
        id= {0}
        />
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
        />
      </div>
    </section>
  );
};

export default SectionCards;
