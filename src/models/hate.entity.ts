import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('hate')
export default class Hate {

  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    name: 'user_id',
  })
  userId!: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt!: Date;
}