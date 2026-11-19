import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import zustandStorage from "@/utils/zustandStorage";

type TUserStore = {
  isGuest: boolean;
  user: any;
  setIsGuest: (isGuest: boolean) => void;
  setUser: (user: any) => any;
};

const useUserStore = create<TUserStore>()(
  persist(
    (set) => ({
      isGuest: false,
      user: null,
      setIsGuest: (isGuest: boolean) => set({ isGuest }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useUserStore;
