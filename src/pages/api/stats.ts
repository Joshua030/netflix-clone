import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { findVideoIdByUser, insertStats, updateStats } from "../../../lib/db/hasura";

interface Body {
  videoId:string;
  favourited: number;
  watched?: boolean
}
export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const token = req.cookies.token;
    try {
      if (!token) return res.status(403).send({});
      const {videoId, favourited, watched=true}:Body = req.body
     
      if (videoId) {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET ?? ""
      ) as jwt.JwtPayload;
      const userId: string = decodedToken.issuer;
      const findVideo = await findVideoIdByUser(userId, videoId, token);
      const doesStatsExist = findVideo.length > 0
      if (doesStatsExist) {
        // update it
        const response = await updateStats(token, {
          favourited,
          watched,
          userId,
          videoId
        });
        res.send({ data:response });
      } else {
        // add it
        const response = await insertStats(token, {
          watched,
          userId,
          videoId,
          favourited
        });
        res.send({ data: response });
      }
    }
      // res.send({ msg: "it works", decodedToken, doesStatsExist });
    } catch (error: any) {
      console.error("Error ocurred /stats");

      res.status(500).send({ done: false, error: error?.message });
    }
  } else {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).send({});
    } else {
      const { videoId } = req.query;
      if (videoId) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET??'') as jwt.JwtPayload;;
     
        
        const userId = decodedToken.issuer;
       
        
        const findVideo = await findVideoIdByUser(userId,videoId as string,token );
    
        
        const doesStatsExist = findVideo?.length > 0;
        if (doesStatsExist) {
          res.send(findVideo);
        } else {
          // add it
          res.status(404);
          res.send({ user: null, msg: "Video not found" });
        }
      }
    }
  }
}
