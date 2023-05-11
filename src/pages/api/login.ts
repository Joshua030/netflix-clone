import { NextApiRequest, NextApiResponse } from "next";
import { magicAdmin } from "../../../lib/db/magic";
import jwt from 'jsonwebtoken'
import { isNewUser } from "../../../lib/db/hasura";

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.split(" ") : "";
      console.log("token", didToken[1]);
     // invoke magic
      const metadata = await magicAdmin.users.getMetadataByToken(didToken[1]);
      console.log({ metadata });
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
      "jacobojacobojacobojacobojacobo123456"
    );
console.log({token});

//CHECK IF USER EXISTS

const isNewUserQuery = await isNewUser(token)

      res.send({ done: true , isNewUserQuery});
    } catch (error) {
      res.status(500).send({ done: false });
      console.error("something went wrong loggin in", error);
    }
  } else {
    res.send({ done: false });
  }
}
