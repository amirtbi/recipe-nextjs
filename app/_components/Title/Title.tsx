import { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h1 className="py-4">{children}</h1>
    </>
  );
};

export default Title;
