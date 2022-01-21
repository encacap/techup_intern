import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.model";
import configs from "./general";
import tokenTypes from "./token";

interface TokenPayload extends JwtPayload {
    type: string;
    user: ObjectId;
}

type Done = (error: Error | null | unknown, user?: any, info?: any) => void;

const jwtOptions = {
    secretOrKey: configs.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: TokenPayload, done: Done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error("Invalid token type");
        }
        const user = await User.findById(payload.user);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify) as unknown as passport.Strategy;

export default jwtStrategy;
