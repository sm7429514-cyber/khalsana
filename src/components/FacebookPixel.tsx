"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID) return;

    const existing = document.querySelector("script#fb-pixel");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "fb-pixel";
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
      `;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!PIXEL_ID) return;
    // @ts-ignore
    if (typeof window.fbq === "function") {
      // @ts-ignore
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}