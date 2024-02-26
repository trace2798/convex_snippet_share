"use client";
import { FC } from "react";
// import { SnippetList } from "./_components/snippet-list";
import { Id } from "@/convex/_generated/dataModel";
import { useSession } from "next-auth/react";
import { SnippetList } from "./_components/snippet-list";

interface PersonalPageProps {}

const PersonalPage: FC<PersonalPageProps> = ({}) => {
  const { data } = useSession();

  console.log(data?.user?.id);
  return (
    <>
      <SnippetList userId={data?.user?.id as Id<"users">} />
    </>
  );
};

export default PersonalPage;
