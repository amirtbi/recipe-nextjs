"use client";
import { userDataService } from "@/../services/user-data-service";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ReceiptPercentIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

const Header = () => {
  const { user, hydrated } = userDataService.useStore();
  const pathname = usePathname();

  if (!hydrated) {
    return <div className="" />;
  }

  return (
    <>
      <div className="fixed transform w-[85%] translate-x-[-50%] translate-y-[-10px] z-5 left-[50%] bottom-0 rounded-2xl p-2 bg-slate-100 flex items-center justify-center gap-10 min-h-[50px]">
        {!hydrated ? null : (
          <>
            <Link
              className={`text-slate-500 hover:text-slate-600 flex flex-col items-center ${
                pathname === "/" ? "text-slate-800" : ""
              }`}
              href="/"
            >
              <HomeIcon
                className={`size-5 text-slate-500 ${
                  pathname === "/" ? "text-slate-800" : ""
                }`}
              />
              <span className="text-[14px] font-bold mt-1">Home</span>
            </Link>
            <Link
              href="/recipes/new-recipe"
              prefetch
              className={`text-slate-500 hover:text-slate-600 flex flex-col items-center ${
                pathname === "/recipes/new-recipe" ? "text-slate-600" : ""
              }`}
            >
              <ReceiptPercentIcon
                className={`size-5 text-slate-500 ${
                  pathname === "/recipes/new-recipe" ? "text-slate-800" : ""
                }`}
              />
              <span className="text-[14px] font-bold mt-1">Recipe</span>
            </Link>
            <Link
              href={
                user.name !== "" ? "/account/profile" : "/account/auth/signIn"
              }
              className={`text-slate-500 flex flex-col items-center hover:text-slate-600 ${
                pathname === "/account" ? "text-slate-600" : ""
              }`}
            >
              <UserCircleIcon
                className={`size-5 text-slate-500 ${
                  pathname === "/account/profile" ? "text-slate-600" : ""
                }`}
              />
              <span className="text-[14px] font-bold mt-1">Account</span>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
