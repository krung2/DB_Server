export interface IUser {

  uniqueId: string,

  grade: number,

  room: number,

  number: number,

  name: string,

  profileImage: string,

  accessLevel: number
}

export interface IResToken {

  status: number;

  message: string;

  data: IUser
}