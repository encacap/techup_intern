import { createClient } from "redis";
import logger from "../configs/logger";
import { ConfessionDocument } from "../models/confession.model";

const redisClient = createClient();

redisClient
    .connect()
    .then(() => {
        logger.info("Connected to Redis");
    })
    .catch((error) => {
        logger.error("Failed to connect to Redis", error);
    });

const getData = async (key: string) => {
    return redisClient.get(key);
};

const getConfessions = async (): Promise<string | null> => {
    const confessions = await redisClient.get("confessions");
    return confessions;
};

const setConfessions = async (confessions: ConfessionDocument[]) => {
    await redisClient.set("confessions", JSON.stringify(confessions));
};

const setConfession = async (confession: ConfessionDocument) => {
    const confessions = await getConfessions();
    if (confessions) {
        const parsedConfessions = JSON.parse(confessions) as ConfessionDocument[];
        parsedConfessions.push(confession);
        await setConfessions(parsedConfessions);
    }
};

export { getData, getConfessions, setConfessions, setConfession };
