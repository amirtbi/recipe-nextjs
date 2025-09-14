"use client";

import { useActionState, useEffect } from "react";
import Title from "../Title/Title";
import { useRouter } from "next/navigation";
import Link from "next/link";
import loginUserAction from "@/account/auth/_loginUserAction";
import { userDataService } from "../../../services/user-data-service";
import { H1Icon } from "@heroicons/react/16/solid";

const SignInForm = () => {
  const login = userDataService.useStore((state) => state.login);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginUserAction, {
    success: true,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      if (state.data) {
        debugger;
        const { data: dataReturn } = state.data;
        login(dataReturn);
        router.push("/account/profile");
      }
    }
  }, [state]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <Title>Sign In</Title>
        <div className="rounded-md bg-slate-400 shadow-md p-4">
          {!state.success && (
            <h1 className="text-center w-full text-red-600 font-regular py-2">
              {state.message}!
            </h1>
          )}
          <form action={formAction} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="block text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="rounded-md px-4 py-2 text-sm  text-pink-100 bg-slate-600 hover:cursor-pointer hover:text-pink-200"
            >
              Sign In
            </button>
          </form>
          <div className="flex my-4 justify-center">
            New one?&nbsp;
            <Link className="font-bold text-white" href="/account/auth/signUp">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
