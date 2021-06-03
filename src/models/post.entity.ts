import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Hate from "./hate.entity";
import Like from "./like.entity";

@Entity('post')
export default class Post {

  @PrimaryGeneratedColumn()
  idx!: number;

  @Column()
  name!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt!: Date;

  @OneToMany(type => Like, like => like.post)
  like!: Like[];

  @OneToMany(type => Hate, hate => hate.post)
  hate!: Hate[];
}