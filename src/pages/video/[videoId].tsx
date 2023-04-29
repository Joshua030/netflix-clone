import {useRouter} from "next/router"
import Modal from "react-modal"
import styles from "../../styles/Video.module.css"
import { getYoutubeVideoById } from "../../../lib/videos";
import { GetStaticPropsContext } from "next";
import NavBar from "../../../components/nav/navBar";

Modal.setAppElement("#__next")
export async function getStaticProps(context:GetStaticPropsContext) {

  // const video= {
  //   title:'Hi cute dog',
  //   publishTime: '1990-01-01',
  //   description: 'A big red dog that is super cute, can he get any bigger?',
  //   channelTitle:  'Paramount Pictures',
  //   viewCount: 10000,

 
  const videoIds = context?.params?.videoId ?? "4zH5iYM4wJo"
  const videoId = Array.isArray(videoIds) ? videoIds[0] : videoIds ;
  console.log({context});




  // const videoId = "4zH5iYM4wJo";

  const videoArray = await getYoutubeVideoById(videoId);
  
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

interface Video {
  title:string,
  publishTime:string,
  description: string,
  channelTitle:  string,
  viewCount: string
}


interface Props {
 video:Video,
}


const Video = ({video}:Props) => {
  const router = useRouter();
  const {query: {videoId}} = router
  console.log({video});

  const {title,publishTime,description,channelTitle,viewCount} =video;

  return (
    <div className={styles.container}>
    {/* video page {router.query.videoId} */}
    <NavBar />
    <Modal
      isOpen={true}
      contentLabel="Watch the video"
      onRequestClose={() => router.back()}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          // src="https://www.youtube.com/embed/4zH5iYM4wJo?autoplay=1&origin=http://example.com&controls=0&rel=0"
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount??0}</span>
              </p>
            </div>
          </div>
        </div>
    </Modal>
  </div>
 )
  
};

export default Video
