import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("whitelist")
export class WhitelistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  constructor(partial ?: Partial<WhitelistEntity>) {
    Object.assign(this, partial);
  }
}
