import { IsNotEmpty } from "class-validator";

export class AddPost {

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  content!: string;
}