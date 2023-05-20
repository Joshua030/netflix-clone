import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { findVideoIdByUser } from "../../../lib/db/hasura";

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const token = req.cookies.token;
    try {
      if (!token) return res.status(403).send({});
      const videoId = req.query.videoId as string;
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET ?? ""
      ) as jwt.JwtPayload;
      const userId = decodedToken.issuer;
      const doesStatsExist = await findVideoIdByUser(userId, videoId, token);
      if (doesStatsExist) {
        // update it
      } else {
        // add it
      }
      res.send({ msg: "it works", decodedToken, doesStatsExist });
    } catch (error: any) {
      console.error("Error ocurred /stats");

      res.status(500).send({ done: false, error: error?.message });
    }
  }
}
