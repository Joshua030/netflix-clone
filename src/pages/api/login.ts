import { NextApiRequest, NextApiResponse } from 'next';
import { magicAdmin } from '../../../lib/db/magic';

export default async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "POST") {
  try {
    const auth = req.headers.authorization;
    const didToken = auth ? auth.split(" ") : "";
    console.log( 'token',didToken[1] );
    // invoke magic

    const metadata = await magicAdmin.users.getMetadataByToken(didToken[1]);
    console.log({metadata});
    
    res.send({ done: true });
  } catch (error) {
    res.status(500).send({ done: false });
    console.error('something went wrong loggin in', error); 
  }
} else {
  res.send({ done: false });
}
}