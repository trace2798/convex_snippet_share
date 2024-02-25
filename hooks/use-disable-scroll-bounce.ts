import { useEffect } from "react";

/**
 * A hook to disable scroll bounce behavior on the document body.
 *
 * @return {void} The function does not return a value.
 */
export const useDisableScrollBounce = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden", "overscroll-none");
    return () => {
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    };
  }, []);
};