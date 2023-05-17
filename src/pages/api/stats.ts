import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { findVideoIdByUser } from "../../../lib/db/hasura";


export default async function stats (req: NextApiRequest, res:NextApiResponse) {
if (req.method === "POST"){

  const token = req.cookies.token 
try {
  if(!token) return res.status(403).send({});
  console.log({token});
   const userId = 'did:ethr:0x1d8E5eEDEeB74751c100272A93b929B243665c39';
   const videoId = '4zH5iYM4wJo'
  const decoded = jwt.verify(token,process.env.JWT_SECRET??'');
  console.log({decoded});
   const findVideoId = await findVideoIdByUser(userId, videoId,token);
   console.log({findVideoId});
   
  res.send ({msg: "it works" , decoded, findVideoId})
  
} catch (error: any) {
  console.error("Error ocurred /stats");
  
  res.status(500).send( {done: false, error: error?.message})
}
}
}