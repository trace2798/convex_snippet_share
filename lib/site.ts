interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
  twitterUsername: string;
}
export const siteConfig: SiteConfig = {
  name: "Snippet Share",
  description:
    "Share code snippets with anyone, anywhere. Create, edit, and share code snippets with ease.",
  url: "https://snippet-share-gamma.vercel.app/",
  ogImage: "https://snippet-share-gamma.vercel.app/og.png",
  links: {
    twitter: "https://twitter.com/Tisonthemove247",
    github: "https://github.com/trace2798/convex_postit",
  },
  twitterUsername: "@Tisonthemove247",
};
