import videoData from "../data/videos.json"


export const getVideos = () => {
  return videoData.items.map(({snippet: {title, thumbnails: {high: {url}}}, id}) => {
    return {
      title,
      imgUrl: url,
      id: id?.videoId,
    };
  });
}
