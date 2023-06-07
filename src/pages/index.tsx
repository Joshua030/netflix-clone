import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "../../components/banner/banner";
import NavBar from "../../components/nav/navBar";
import SectionCards from "../../components/card/sectionCards";
import { getPopularVideos, getVideos, getWatchAgainVideos } from "../../lib/videos";
import { NextPageContext } from "next";
import cookie from 'cookie';
import { verifyToken } from "../../lib/utils";






export async function getServerSideProps (context: NextPageContext) {
  const cookies = cookie.parse(context?.req?.headers.cookie || '');
  const token = cookies.token || '';
  const userId = await verifyToken(token);
  console.log(userId);
  const watchItAgainVideos = await getWatchAgainVideos(userId, token);
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");

  const travelVideos = await getVideos("indie music");
  const popularVideos = await getPopularVideos();
  return {
    props: { disneyVideos, travelVideos, productivityVideos,popularVideos, watchItAgainVideos }, // will be passed to the page component as props
  };
}


interface props {
  disneyVideos:Video[],
  travelVideos:Video[], 
  productivityVideos:Video[],
popularVideos:Video[]
watchItAgainVideos:Video[]
}

export default function Home({disneyVideos,travelVideos,productivityVideos,popularVideos, watchItAgainVideos}:props) {


  return (
    <div>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <h2>Netflix</h2> */}
      <div className={styles.main}>
      <NavBar />
      <Banner
        title="clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
        videoId="4zH5iYM4wJo"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large"/>
        <SectionCards title="Watch it again" videos={watchItAgainVideos} size="small"/>
        <SectionCards title="Travel" videos={travelVideos} size="small"/>
        <SectionCards title="Productivity" videos={productivityVideos} size="medium"/>
        <SectionCards title="Popular" videos={popularVideos} size="small"/>
      </div>
      </div>
    </div>
  );
}
