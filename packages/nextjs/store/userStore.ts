import { create } from "zustand";
import { UserInfo } from "~~/types/ProfileTypes";

type Store = {
  userInfo?: UserInfo;
  setPreviewUser: (userInfo: UserInfo) => void;
};
export const userStore = create<Store>(set => ({
  userInfo: undefined,
  setPreviewUser: (userInfo: UserInfo) => set({ userInfo }),
}));
