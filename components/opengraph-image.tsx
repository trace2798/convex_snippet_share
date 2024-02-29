import { siteConfig } from "@/lib/site";
import { ImageResponse } from "next/og";

export type Props = {
  title?: string;
  description?: string;
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title, description } = {
    ...{
      title: siteConfig.name,
      description: siteConfig.description,
    },
    ...props,
  };

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img width="256" height="256" src="../public/og.png" />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await fetch(
            new URL("../fonts/Inter-SemiBold.ttf", import.meta.url)
          ).then((res) => res.arrayBuffer()),
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
