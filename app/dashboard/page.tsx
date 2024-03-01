"use client";
import { Id } from "@/convex/_generated/dataModel";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC, Suspense } from "react";
import { SnippetCard } from "./_components/snippet-card";
import { SnippetList } from "./_components/snippet-list";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
  const { data, status } = useSession();
  if (status === "loading")
    return (
      <>
        <SnippetCard.Skeleton />
      </>
    );
  if (status === "unauthenticated" || !data) {
    redirect("/");
  }
  return (
    <>
      <Suspense fallback={<SnippetCard.Skeleton />}>
        <SnippetList userId={data?.user?.id as Id<"users">} />
      </Suspense>
    </>
  );
};

export default DashboardPage;
