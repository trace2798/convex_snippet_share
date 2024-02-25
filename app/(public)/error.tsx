"use client";
import { FC } from "react";

interface errorProps {}

const error: FC<errorProps> = ({}) => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        Sorry. Something went wrong
      </div>
    </>
  );
};

export default error;
