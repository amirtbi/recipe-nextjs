import { BaseActions, BaseDataService, BaseState } from "./data-service";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface UserState extends BaseState<IUser> {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
  };
}
interface IUserActions extends BaseActions<IUser> {
  login: (userInfo: IUser) => void;
}

class UserDataService extends BaseDataService<IUser, UserState, IUserActions> {
  constructor() {
    super(
      {
        user: { id: "", email: "", password: "", name: "", phone: "" },
        hydrated: false,
      },
      "user"
    );
  }

  protected getActions(
    set: {
      (
        partial:
          | (UserState & IUserActions)
          | Partial<UserState & IUserActions>
          | ((
              state: UserState & IUserActions
            ) =>
              | (UserState & IUserActions)
              | Partial<UserState & IUserActions>),
        replace?: false
      ): void;
      (
        state:
          | (UserState & IUserActions)
          | ((state: UserState & IUserActions) => UserState & IUserActions),
        replace: true
      ): void;
    },
    get: () => UserState & IUserActions
  ): IUserActions {
    return {
      login: ({ id, name, email, password, phone }: IUser) => {
        debugger;
        set({ user: { id, name, email, password, phone } });
      },

      setHydrated: () => {
        set({ hydrated: true });
      },

      getItems: () => {
        return get().user;
      },

      addItem: (item: IUser) => {
        // set({
        //   items: [...get().items, { ...item, id: this.generateId() }],
        // });
      },

      removeItem: (id: string) => {
        // set({
        //   items: get().items.filter(
        //     (item: IUser & { id: string }) => item.id !== id
        //   ),
        // });
      },

      updateItem: (id: string, updated: Partial<IUser>) => {
        // set({
        //   items: get().items.map((item: IUser & { id: string }) => {
        //     return item.id === id ? { ...item, ...updated } : item;
        //   }),
        // });
      },
    };
  }
}

export const userDataService = new UserDataService();
