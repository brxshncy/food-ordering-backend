import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH_0_AUDIENCE,
  issuerBaseURL: process.env.AUTH_0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH_0_TOKEN_SIGNING_ALG,
});

export const jwtParser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub as string;

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.sendStatus(401);
    }

    // Ensure that user._id is not null or undefined
    if (!user._id) {
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
