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
  previewImage: string;
  permission: string;
  name?: string;
  url: string;
  isPlay: boolean;
  comments: Array<{ name: string; comment: string }>;
}

export interface UploadClip {
  title: string;
  description: string;
  permission: string;
  video: Array<any>;
}

export interface AllPlaylist {
  title: string;
  description: string;
  previewImage: string;
  numberOfVideo: number;
  videoOwner: string;
}
