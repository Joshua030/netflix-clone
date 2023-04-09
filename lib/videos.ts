interface dataFetch {
  snippet: { title: string; thumbnails: { high: { url: string } } };
  id: {videoId:string};
}

export const getCommonVideos = async (url:string) => {
  const YOUTUBE_API_KEY = process.env.YOU_TUBE_API_KEY;

  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=[YOUR_API_KEY]'
try {
  const BASE_URL = "youtube.googleapis.com/youtube/v3";
  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
  );

  const data = await response.json();
  return data?.items.map(
    ({
      snippet: {
        title,
        thumbnails: {
          high: { url },
        },
      },
      id,
    }: dataFetch) => {
      return {
        title,
        imgUrl: url,
        id: id?.videoId,
      };
    }
  );
} catch (error) {
  console.log({error});
  return [];
}
};


export const getVideos = (searchQuery:string) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};