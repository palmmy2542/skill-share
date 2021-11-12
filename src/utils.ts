export type Token = {
  token: string;
  expiry: number;
};

export const STATE = { EDIT: "EDIT", SAVE: "SAVE" };

export const PERMISSION = (permission: boolean) => {
  if (permission) return "public";
  else return "private";
};