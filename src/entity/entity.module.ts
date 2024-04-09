import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/provider/database/db.module";
import { BookEntity } from "./book.entity";

@Module({
    imports: [DatabaseModule],
    providers: [BookEntity],
    exports: [BookEntity],
  })
  export class EntityModule {}
  