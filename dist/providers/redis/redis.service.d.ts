import { Redis } from "ioredis";
export declare class RedisService {
    private readonly redisSession;
    constructor(redisSession: Redis);
    setUserSession(key: any, value: any, expTime: any): Promise<"OK">;
    getUserSession(key: string): Promise<string>;
    deleteUserSession(key: string): Promise<void>;
}
