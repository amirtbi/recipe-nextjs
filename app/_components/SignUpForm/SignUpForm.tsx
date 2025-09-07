"use client";

import { useActionState, useEffect } from "react";
import Title from "../Title/Title";
import { useRouter } from "next/navigation";
import { userDataService } from "../../../services/user-data-service";
import createUserAction from "@/account/auth/_creatUserAction";
import { useEditable } from "@chakra-ui/react";
import Link from "next/link";

const SignUpForm = () => {
  const router = useRouter();
  const login = userDataService.useStore((state) => state.login);
  const [state, formAction, isPending] = useActionState(createUserAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      if (state.data) {
        const { data: dataReturn } = state.data;
        login(dataReturn);
        router.push("/account/profile");
      }
    }
  }, [state]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <Title>Sign Up</Title>
        <div className="rounded-md bg-slate-400 shadow-md p-4">
          <form action={formAction} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block text-sm mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
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
              <label htmlFor="phone" className="block text-sm mb-2">
                Phone
              </label>
              <input
                type="tell"
                id="phone"
                name="phone"
                placeholder="Enter your phone"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="rounded-md px-4 py-2 text-sm  text-pink-100 bg-slate-600 hover:cursor-pointer hover:text-pink-200"
            >
              Sign Up
            </button>
          </form>
          <div className="flex my-4 justify-center">
            Have you account?&nbsp;
            <Link className="text-white font-bold" href="/account/auth/signIn">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
