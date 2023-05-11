import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "../../components/banner/banner";
import NavBar from "../../components/nav/navBar";
import Card from "../../components/card/card";
import SectionCards from "../../components/card/sectionCards";
import { getPopularVideos, getVideos } from "../../lib/videos";
import { magic } from "../../lib/magic-client";
import { startFetchMyQuery } from "../../lib/db/hasura";




export async function getServerSideProps () {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");

  const travelVideos = await getVideos("indie music");
  const popularVideos = await getPopularVideos();
  return {
    props: { disneyVideos, travelVideos, productivityVideos,popularVideos }, // will be passed to the page component as props
  };
}


interface props {
  disneyVideos:Video[],
  travelVideos:Video[], 
  productivityVideos:Video[],
popularVideos:Video[]
}

export default function Home({disneyVideos,travelVideos,productivityVideos,popularVideos}:props) {

  startFetchMyQuery()
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
        imgUrl="/static/intestellar.jpg"
        videoId="4zH5iYM4wJo"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large"/>
        <SectionCards title="Travel" videos={travelVideos} size="small"/>
        <SectionCards title="Productivity" videos={productivityVideos} size="medium"/>
        <SectionCards title="Popular" videos={popularVideos} size="small"/>
      </div>
      </div>
    </div>
  );
}
