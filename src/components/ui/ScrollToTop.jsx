import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function ScrollToTop() {
  const pathName = usePathname();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathName]);
  return <></>;
}
