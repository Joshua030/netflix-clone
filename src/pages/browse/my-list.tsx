import Head from "next/head"
import NavBar from "../../../components/nav/navBar"
import SectionCards from "../../../components/card/sectionCards"
import styles from "../../styles/MyList.module.css"
import { NextPageContext } from "next"
import { getMyList } from "../../../lib/videos"
import cookie from 'cookie';
import { verifyToken } from "../../../lib/utils"

export async function getServerSideProps(context: NextPageContext) {
  const cookies = cookie.parse(context?.req?.headers.cookie || '');
  const token = cookies.token || '';
  const userId = await verifyToken(token);
  const videos = await getMyList(userId, token);
  return {
    props: {
      myListVideos: videos,
    }
  }
}

interface MyVideos {
  myListVideos: Video[]
}



const MyList = ({myListVideos}: MyVideos ) => {
  return (
    <div>
   <Head>
    <title>My List</title>
   </Head>
   <main className={styles.main}>
    <NavBar />
    <div className={styles.sectionWrapper}>
      <SectionCards  title="My List" videos={myListVideos} size="small" shouldWrap={true} shouldScale={false}/>
    </div>
   </main>
    </div>
  )
}

export default MyList