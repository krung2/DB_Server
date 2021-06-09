import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Post from "./post.entity";

@Entity('like')
export default class Like {

  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    name: 'user_ip',
  })
  userIp!: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt!: Date;

  @JoinColumn({ name: 'post_idx' })
  @ManyToOne(type => Post, {
    onDelete: 'CASCADE'
  })
  post!: Post;
}