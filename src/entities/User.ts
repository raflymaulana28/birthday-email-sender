import {
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  ObjectId,
  Column,
  BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id!: string;
  
  @Column()
  name: string = "";

  @Column()
  email: string = "";

  @Column()
  birthDate: Date = new Date();

  @Column()
  location: string = "";
}
