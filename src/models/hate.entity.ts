import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Post from "./post.entity";

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

  @JoinColumn({ name: 'post_idx' })
  @ManyToOne(type => Post, {
    onDelete: 'CASCADE'
  })
  post!: Post;
}