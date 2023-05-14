import { NextApiRequest, NextApiResponse } from "next";
import { magicAdmin } from "../../../lib/db/magic";
import jwt from 'jsonwebtoken'
import { isNewUser } from "../../../lib/db/hasura";

interface Metadata {
    issuer: string,
    publicAddress: string,
    email: string,
    oauthProvider: string | null,
    phoneNumber: string | null,
    wallets: []
  }


export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.split(" ") : "";
  
     // invoke magic
      const metadata:Metadata = await magicAdmin.users.getMetadataByToken(didToken[1]);
  
      // create jwt

      const token = jwt.sign({
        ...metadata,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${metadata.issuer}`,
        },
      },
     process.env.JWT_SECRET??""
    );

    console.log({metadata});
    

//CHECK IF USER EXISTS

const isNewUserQuery = await isNewUser(token,metadata.issuer)

      res.send({ done: true , isNewUserQuery});
    } catch (error) {
      res.status(500).send({ done: false });
      console.error("something went wrong loggin in", error);
    }
  } else {
    res.send({ done: false });
  }
}
