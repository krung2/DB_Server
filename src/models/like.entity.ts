import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export default class Post {

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