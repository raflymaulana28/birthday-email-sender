import { Entity, ObjectIdColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Log extends BaseEntity {
  @ObjectIdColumn()
  _id!: string;

  @Column()
  message: string = "";

  @Column({
    type: "enum",
    enum: ["error", "success"],
  })
  status: string = "";

  @Column()
  createdAt: Date = new Date();
}
