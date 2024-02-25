"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const EmptySnippets = () => {
  const router = useRouter();

  // const { user } = useUser();
  // console.log(user);
  //console.log(userId);
  const { data } = useSession();
  const userId = data?.user?.id;
  console.log(userId)
  if (!userId) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  const { mutate, pending } = useApiMutation(api.snippet.create);

  const onClick = () => {
    if (!userId) return;

    mutate({
      userId: userId as Id<"users">,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Snippet created");
        router.push(`/dashboard/snippet/${id}`);
      })
      // .catch(() => toast.error("Failed to create snippet"));
      .catch((error) => console.error(error));
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* <Image src="/note.svg" height={110} width={110} alt="Empty" /> */}
      <h2 className="text-2xl font-semibold mt-6">
        Create your first snippet!
      </h2>
      <p className="text-muted-foreground textg-sm mt-2">
        Start by creating a snippet for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create snippet
        </Button>
      </div>
    </div>
  );
};
