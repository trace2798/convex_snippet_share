"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import { useLanguageStore } from "@/store/language";
import { LanguageDefinition, SUPPORTED_LANGUAGES } from "@/lib/language";
import { Id } from "@/convex/_generated/dataModel";

export const RenameModal = () => {
  const { data } = useSession();
  const { mutate, pending } = useApiMutation(api.snippet.updateTitle);
  const { language, setLanguage } = useLanguageStore();
  const { isOpen, onClose, initialValues } = useRenameModal();
  const { mutate: mutateLanguage, pending: pendingLanguageChange } =
    useApiMutation(api.snippet.updateLanguage);
  const handleLanguageChange = (id: string, language: string) => {
    mutateLanguage({
      id: id as Id<"snippets">,
      language: language,
      userId: data?.user.id,
    })
      .then(() => {
        toast.success("Language Updated");
      })
      .catch(() => toast.error("Failed to update language"));
  };
  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({
      id: initialValues.id,
      title,
      userId: data?.user.id,
    })
      .then(() => {
        const detectedLanguage = detectLanguage(title);
        if (detectedLanguage) {
          // Set the language to the detected language
          setLanguage(detectedLanguage.id);
          handleLanguageChange(initialValues.id, detectedLanguage.id);

          toast.success(`Language detected to be ${detectedLanguage.id}`);
        } else {
          // Set the language to "no language" if no language was detected
          setLanguage("no language");
          handleLanguageChange(initialValues.id, "no language");
        }
        toast.success("Snippet renamed");

        onClose();
      })
      .catch(() => toast.error("Failed to rename snippet"));
    // .catch((error) => // console.log(error));
  };

  useEffect(() => {
    // Close the modal when the language changes
    onClose();
  }, [language]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit snippet title</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter a new title for this snippet
        </DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Snippet title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const detectLanguage = (fileName: string): LanguageDefinition | undefined => {
  // Get the file extension
  const fileExtension = fileName.slice(fileName.lastIndexOf("."));

  // Find the language in SUPPORTED_LANGUAGES that matches the file extension
  const detectedLanguage = SUPPORTED_LANGUAGES.find(
    (language) => language.fileExtension === fileExtension
  );

  return detectedLanguage;
};
