interface dataFetch {
  snippet: { title: string; thumbnails: { high: { url: string } }; description: string; channelTitle: string, publishedAt:string };
  id: {videoId:string}; statistics:{viewCount: string}
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
        description,
        channelTitle,
        publishedAt
      },
      id,
      statistics :{viewCount}
    }: dataFetch) => {
      return {
        title,
        imgUrl: url,
        id: id?.videoId || id,
        description,
        channelTitle,
        publishTime:publishedAt,
        viewCount: viewCount??'0'
        
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

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId:string) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  return getCommonVideos(URL);
};