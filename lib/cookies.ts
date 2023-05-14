import cookie from "cookie"
import { NextApiResponse } from "next";

const MAX_AGE = 7 * 24 * 60 * 60;
export const setTokenCookie = (token:string, res: NextApiResponse) => {
const setCookie = cookie.serialize("token", token, {
 maxAge: MAX_AGE,
 expires: new Date (Date.now() + MAX_AGE * 1000),
 path:"/"
});
res.setHeader('Set-Cookie', setCookie)
}
