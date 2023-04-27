import Image from "next/image";
import styles from "./banner.module.css";
import { useRouter } from "next/router";

interface props {
  title: string;
  subTitle: string;
  imgUrl: string;
  videoId: String;
}
const Banner = ({ title, subTitle, imgUrl,videoId }: props) => {

  const router = useRouter();

  const handleOnPlay = (): void => {
    console.log("handleOnPlay");
    router.push(`video/${videoId}`)
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className="playBtnWrapper">
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src="static/play_arrow.svg"
                alt="play icon"
                width={32}
                height={32}
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default Banner;
