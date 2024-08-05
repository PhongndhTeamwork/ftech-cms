import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true})
  email: string;

  @Column()
  picture: string;

  @Column()
  username: string;

  @Column({ name: "email_id" })
  emailId: string;

  constructor(partial ?: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}