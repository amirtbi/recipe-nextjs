"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchRecipeForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    if (!searchValue) return;

    router.push(`/recipes/search/?char=${searchValue}`);
  };
  return (
    <>
      <div className="p-2 w-full">
        <form onSubmit={handleSubmitForm}>
          <input
            placeholder="Search recipe..."
            type="text"
            value={searchValue}
            className="text-slate-400 placeholder:text-slate-400 w-full border-2 rounded-lg p-1 border-slate-300 focus:border-slate-400"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>
    </>
  );
};

export default SearchRecipeForm;
