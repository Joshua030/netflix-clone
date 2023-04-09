interface dataFetch {
  snippet: { title: string; thumbnails: { high: { url: string } } };
  id: {videoId:string};
}

export const getVideos = async (searchQuery:string) => {
  const YOUTUBE_API_KEY = process.env.YOU_TUBE_API_KEY;

  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=[YOUR_API_KEY]'
try {
  
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&type=video&key=${YOUTUBE_API_KEY}`
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
  
}
};
