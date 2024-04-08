import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()

export class RedisService{
    constructor(
        @Inject('REDIS_SESSION') private readonly redisSession: Redis,
    ){}

    async setUserSession(key:any, value:any,expTime:any){
        const data = await this.redisSession.set(key,value,'EX',expTime);
        return data;
    };
    async getUserSession(key: string) {
        const data = await this.redisSession.get(key);
        return data;
      };

    async deleteUserSession(key:string){
        await this.redisSession.emit(key);
    }
}