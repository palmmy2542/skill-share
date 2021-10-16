export interface UserAccount {
  id: string;
  username: string;
  fname: string;
  lname: string;
  subscribing: number;
  subscribers: number;
}

export interface ClipProp {
  title: string;
  description: string;
  tags: Array<string>;
  name: string;
  url: string;
  isPlay: boolean;
  comments: Array<{ name: string; comment: string }>;
}
