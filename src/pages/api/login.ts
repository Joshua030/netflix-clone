import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "POST") {
  try {
    const auth = req.headers.authorization;
    const didToken = auth ? auth.split(" ") : "";
    console.log( 'token',didToken[1] );
    res.send({ done: true });
  } catch (error) {
    res.status(500).send({ done: false });
    console.error('something went wrong loggin in', error); 
  }
} else {
  res.send({ done: false });
}
}