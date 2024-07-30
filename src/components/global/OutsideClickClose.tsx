import { ReactElement, useEffect, useRef } from "react";

export function OutsideClickClose({
  activePop,
  children,
  setActivePop,
  className,
}: {
  activePop: boolean;
  children: ReactElement;
  className?: string;
  setActivePop: Function;
}) {
  const popupBlock = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        popupBlock.current &&
        !popupBlock.current.contains(event.target) &&
        activePop == true
      ) {
        setActivePop(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    if (activePop == false) {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupBlock, activePop]);
  return (
    <div className={className} ref={popupBlock}>
      {children}
    </div>
  );
}
