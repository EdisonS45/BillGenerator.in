"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pageview } from "@/lib/gtag";

export default function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    pageview(pathname);
  }, [pathname]);

  return null;
}
