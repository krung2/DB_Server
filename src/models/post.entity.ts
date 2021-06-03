import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export default class Post {

  @PrimaryGeneratedColumn()
  idx!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt!: Date;
}