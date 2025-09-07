import { create, type StoreApi, type UseBoundStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface BaseState<T> {
  item?: T;
  hydrated: boolean;
}

export interface BaseActions<T> {
  addItem: (item: T) => void;
  updateItem: (id: string, updates: Partial<T>) => void;
  removeItem: (id: string) => void;
  getItems: () => T | null;
  setHydrated: () => void;
}

export abstract class BaseDataService<
  T,
  S extends BaseState<T>,
  A extends BaseActions<T>
> {
  protected store: UseBoundStore<StoreApi<S & A>>;
  protected initialState: S;
  protected storageKey?: string;

  constructor(initialState: S, storageKey?: string) {
    this.initialState = initialState;
    this.storageKey = storageKey;

    if (storageKey) {
      this.store = create<S & A>()(
        persist(
          (set, get) => ({
            ...initialState,
            ...this.getActions(set, get),
          }),
          {
            name: storageKey,
            onRehydrateStorage: () => {
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
    } else {
      this.store = create<S & A>((set, get) => {
        return { ...initialState, ...this.getActions(set, get) };
      });
    }
  }
  protected abstract getActions(
    set: StoreApi<S & A>["setState"],
    get: StoreApi<S & A>["getState"]
  ): A;

  public useStore = <U = S & A>(selector?: (state: S & A) => U): U => {
    return selector ? this.store(selector) : this.store((state) => state as U);
  };

  protected generateId = (): string => Math.random().toString(36).substr(2, 9);
}
