"use client";

import { userDataService } from "../../../services/user-data-service";
import Skeleton from "../Skeleton/Skeleton";
import Title from "../Title/Title";

const UserProfile = () => {
  const { user, hydrated } = userDataService.useStore((state) => state);

  console.log("user", user);
  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <Title>Profile</Title>
        <div className="flex flex-col gap-5 rounded-md bg-slate-400 shadow-md p-4">
          <div>name:{user.name}</div>
          <div>Email:{user.email}</div>
          <div>Phone:{user.phone}</div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
