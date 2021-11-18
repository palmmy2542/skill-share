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
  userId: string;
  username: string;
  url: string;
  isPlay: boolean;
  videoId: string;
}

export interface UploadClip {
  title: string;
  description: string;
  permission: string;
  video: Array<any>;
}

export interface AllPlaylist {
  id: string;
  title: string;
  description: string;
  videoList: string[];
  permission: string;
  userId: string | undefined;
  creatorId?: string;
}

export interface CommentProps {
  id: string;
  userId: string;
  videoId: string;
  username: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  edited: boolean;
}