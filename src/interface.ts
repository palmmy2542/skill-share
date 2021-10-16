export interface ClipProp {
  title: string;
  description: string;
  tags: Array<string>;
  name: string;
  url: string;
  isPlay: boolean;
  comments: Array<{ name: string; comment: string }>;
}
