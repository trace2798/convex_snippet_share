export type Snippet =
  | {
      _id: Id<"snippets">;
      _creationTime: number;
      content?: string | undefined;
      notes?: string | undefined;
      theme?: string | undefined;
      userId: Id<"users">;
      title: string;
      backgroundColor: string;
      isPublic: boolean;
      language: string;
      padding: string;
      textSize: string;
    }
  | undefined;
