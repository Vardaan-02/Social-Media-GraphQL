"use client";

import { cn } from "@/ui/lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

const MouseEnterContext = createContext<
  | {
      isMouseEntered: boolean;
      setIsMouseEntered: React.Dispatch<React.SetStateAction<boolean>>;
      x: number;
      y: number;
    }
  | undefined
>(undefined);

export const CardContainer = ({
 children = null,
 className,
 containerClassName,
 colour,
}: {
 children?: React.ReactNode | React.ReactNode[];
 className?: string;
 containerClassName?: string;
 colour?: string;
}) => {
 const containerRef = useRef<HTMLDivElement>(null);
 const [isMouseEntered, setIsMouseEntered] = useState(false);
 const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
 const [bgPosition, setBgPosition] = useState<string>("center");

 const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (!containerRef.current) return;

  const { left, top, width, height } = containerRef.current.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;
  setMousePos({ x, y });

  const rotX = (x - width / 2) / 100;
  const rotY = (y - height / 2) / 100;
  containerRef.current.style.transform = `rotateY(${rotX}deg) rotateX(${rotY}deg)`;

  containerRef.current.style.setProperty("--x", `${x}px`);
  containerRef.current.style.setProperty("--y", `${y}px`);

  if (x < width / 3 && y < height / 3) {
   setBgPosition("top-left");
  } else if (x > (2 * width) / 3 && y < height / 3) {
   setBgPosition("top-right");
  } else if (x < width / 3 && y > (2 * height) / 3) {
   setBgPosition("left-bottom");
  } else if (x > (2 * width) / 3 && y > (2 * height) / 3) {
   setBgPosition("right-bottom");
  } else if (x < width / 3) {
   setBgPosition("left");
  } else if (y > (2 * height) / 3) {
   setBgPosition("bottom");
  } else if (x > (2 * width) / 3) {
   setBgPosition("right");
  } else if (y < height / 3) {
   setBgPosition("top");
  } else {
   setBgPosition("center");
  }
 };

 const handleMouseEnter = () => {
  setIsMouseEntered(true);
 };

 const handleMouseLeave = () => {
  if (!containerRef.current) return;
  setIsMouseEntered(false);
  containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  containerRef.current.style.setProperty("--x", `50%`);
  containerRef.current.style.setProperty("--y", `50%`);
  setBgPosition("center");
 };

 return (
  <MouseEnterContext.Provider
   value={{
    isMouseEntered,
    setIsMouseEntered,
    x: mousePos.x,
    y: mousePos.y,
   }}
  >
   <div
    className={cn(
     "py-20 flex items-center justify-center",
     containerClassName
    )}
    style={{ perspective: "1000px" }}
   >
    <div
     ref={containerRef}
     onMouseEnter={handleMouseEnter}
     onMouseMove={handleMouseMove}
     onMouseLeave={handleMouseLeave}
     className={cn(
      "flex items-center justify-center relative transition-all duration-200 ease-linear",
      className,
      {
       "border-l-2": bgPosition === "left",
       "border-b-2": bgPosition === "bottom",
       "border-r-2": bgPosition === "right",
       "border-t-2": bgPosition === "top",
       "border-t-2 border-l-2": bgPosition === "top-left",
       "border-t-2 border-r-2": bgPosition === "top-right",
       "border-b-2 border-l-2": bgPosition === "left-bottom",
       "border-r-2 border-b-2": bgPosition === "right-bottom",
       "border-none": bgPosition === "center",
      }
     )}
     style={{
      borderColor: isMouseEntered
       ? `${colour || "rgba(255,255,255,0.1)"}`
       : "transparent",
      transformStyle: "preserve-3d",
     }}
    >
     {children}
    </div>
   </div>
  </MouseEnterContext.Provider>
 );
}
export const CardBody = ({
  children,
  className,
  colour,
}: {
  children?: React.ReactNode;
  className?: string;
  colour?: string;
}) => {
  const { isMouseEntered, x, y } = useMouseEnter();

  return (
   <div
    className={cn(
     "h-96 w-96 [transform-style:preserve-3d] relative",
     className
    )}
   >
    <div
    className="absolute inset-0"
    style={{
    backgroundImage: isMouseEntered
    ? `radial-gradient(ellipse 550px 450px at ${x}px ${y}px, ${colour || "rgba(255,255,255,0.02)"}, transparent 40%)`
    : undefined,
    zIndex: -1,
    }}
    />
    {children}
   </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  colour,
  ...rest
}: {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
  colour?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isMouseEntered, x, y } = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;

    // if (isMouseEntered) {
    //   ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    // } else {
    //   ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    // }
  }, [isMouseEntered, x, y]);

  return (
    // @ts-ignore
    <Tag
       // @ts-ignore
      ref={ref}
         // @ts-ignore
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (!context) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
