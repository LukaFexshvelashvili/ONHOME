export default function HoverTitle(props: {
  title: string;
  top?: true;
  left?: true;
  bottom?: true;
}) {
  return (
    <div
      className={`tracking-widest font-mainMedium pointer-events-none absolute text-center bg-bodyBg rounded-md px-2 py-1 text-[12px] text-blackMain   
        ${
          props.top
            ? "top-[-35px]"
            : props.bottom
            ? "bottom-[-45px]"
            : "bottom-[-35px]"
        } ${
        props.left ? "right-[0]" : "left-[50%] translate-x-[-50%]"
      }  z-[3] transition-all invisible opacity-0 group-hover:visible group-hover:opacity-100 border-2 border-whiteLoad`}
    >
      {props.title}
    </div>
  );
}
