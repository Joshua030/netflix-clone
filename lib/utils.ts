import jwt from "jsonwebtoken";

export async function verifyToken(token: string) {
  if (token) {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET ?? ""
    ) as jwt.JwtPayload;

    const userId = decodedToken?.issuer;
    return userId;
  }

  return null;
}
