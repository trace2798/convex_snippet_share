import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function exportToPng(dom: any, title: string) {
  console.log(dom, "dom");
  domtoimage
    .toPng(dom)
    .then(function (dataUrl) {
      saveAs(dataUrl, `${title}.png`);
      toast.success("Picture downloaded");
      console.log("dataUrl", dataUrl);
    })
    .catch(function (error) {
      toast.error("Failed to download picture");
      console.error("oops, something went wrong!", error);
    });
}
