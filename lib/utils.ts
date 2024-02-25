import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function exportToPng(dom: any) {
  // console.log(dom);
  domtoimage
    .toPng(dom)
    .then(function (dataUrl) {
      saveAs(dataUrl, "screenshot.png");
      // console.log("dataUrl", dataUrl);
    })
    .catch(function (error) {
      // console.error("oops, something went wrong!", error);
    });
}
