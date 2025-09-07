"use client";

import { userDataService, IUser } from "@/../services/user-data-service";
import { FormEvent, useId, useState } from "react";

const LoginForm = () => {
  const id = useId();
  const login = userDataService.useStore((state) => state.login);

  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    login(user);
  };
  return (
    <>
      <div className="shadowm-md bg-white rounded-md p-5">
        <form
          onSubmit={handleSubmitForm}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex w-full p-4">
            <input
              className="p-4 border-2 border-gray-400 rounded-md w-full placeholder:text-gray-600 text-slate-600"
              placeholder="name"
              onChange={(e) => {
                setUser((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </div>
          <div className="flex w-full p-4">
            <input
              className="p-4 border-2 border-gray-400 rounded-md w-full placeholder:text-gray-600 text-slate-600"
              placeholder="email"
              type="email"
              onChange={(e) => {
                setUser((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
          </div>
          <div className="flex w-full p-4">
            <input
              className="p-4 border-2 border-gray-400 rounded-md w-full placeholder:text-gray-600 text-slate-600"
              placeholder="age"
              onChange={(e) => {
                setUser((prev) => ({ ...prev, age: +e.target.value }));
              }}
            />
          </div>
          <button className="bg-blue-600 text-white rounded-md px-2 py-4">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
