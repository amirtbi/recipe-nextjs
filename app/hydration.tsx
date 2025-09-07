"use client";
import { useEffect, useState } from "react";
import { userDataService } from "../services/user-data-service";

export function Hydration({ children }: { children: React.ReactNode }) {
  const hydrated = userDataService.useStore((state) => state.hydrated);

  if (!hydrated) {
    // Option 1: render nothing
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-white text-2xl">Loading...</span>
        </div>
      </>
    );
    // Option 2: render a skeleton
    // return <div className="animate-pulse">Loading...</div>;
  }

  return <>{children}</>;
}
