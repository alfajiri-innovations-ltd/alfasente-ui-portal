import * as React from "react";

const MOBILE_BREAKPOINT = 768;
// const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed
// const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024; // Adjust the breakpoint as needed
// const isDesktop = window.innerWidth > 1024; // Adjust the breakpoint as needed
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
