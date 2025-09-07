import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface IAuthStore {
  user: IUser | null;
  hydrated: boolean;
  setHydrated(): void;
  login: (userInfo: IUser) => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set, get) => ({
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      login({ email, password, name, phone }: IUser) {
        set({ user: { email, name, password, phone } });
      },
    })),

    {
      name: "auth",
      onRehydrateStorage: (state) => {
        console.log("hydration starts");
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            state?.setHydrated();
          }
        };
      },
    }
  )
);

export default useAuthStore;
