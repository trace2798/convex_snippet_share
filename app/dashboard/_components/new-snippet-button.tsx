"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface NewSnippetButtonProps {
  userId: string;
  disabled?: boolean;
}

export const NewSnippetButton = ({
  userId,
  disabled,
}: NewSnippetButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.snippet.create);

  const onClick = () => {
    mutate({
      userId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("snippet created");
        router.push(`/snippet/${id}`);
      })
      .catch(() => toast.error("Failed to create snippet"));
  };

  return (
    <>
      <Button
        disabled={pending || disabled}
        onClick={onClick}
        className=" items-center justify-center "
        variant="outline"
      >
        <Plus className="h-5 w-5 stroke-1" />
        &nbsp; New snippet

      </Button>
    
    </>
  );
};
