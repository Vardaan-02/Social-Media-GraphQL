"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/ui/components/ui/3d-card";
import { Badge } from "@/ui/components/ui/badge";
import { colorMapping,borderMapping,backgroundMapping } from "@/ui/lib/mockdata";

export function AboutCard(
 {
 colour,
 title,
 description,
 image,
 imageAlt,
 imageWidth,
 imageHeight,
 imageClassName,
 direction,
 className,
 containerClassName,
 Icon,
 children,
 }:{
 colour?: string;
 title?: React.ReactNode;
 description?: React.ReactNode;
 image?: string;
 imageAlt?: string;
 imageWidth?: number;
 imageHeight?: number;
 imageClassName?: string;
 direction?: "left" | "right";
 className?: string;
 containerClassName?: string;
 Icon?: React.ReactNode;
 [key: string]: any;
 }
 ) {
 return (
  <CardContainer className="inter-var bg-black w-full max-w-[1100px] h-auto md:h-[600px] mx-auto"
  colour={colour}>
  <Badge className={`${direction === "left" 
     ? `top-[-35px] left-4 md:left-10` 
     : `top-[-35px] right-4 md:right-10`} rounded-full border-2 ${borderMapping[colour ?? "gray"]} text-white p-4 md:p-6 font-semibold fixed ${colour ? `${backgroundMapping[colour]}` : ""} z-50 text-sm md:text-xl flex items-center justify-center shadow-lg shadow-[${colour}]`}>
    <div className="w-full h-full flex items-center justify-center">
   {Icon}
    </div>
  </Badge>
  <CardBody className="relative group/card w-full h-full p-4 md:p-6 border"
   colour={colour}>
   <div className="flex flex-col md:flex-row items-center justify-between">
   <div className="text-center md:text-left">
    <CardItem
    translateZ="50"
    className={`text-xl md:text-3xl font-bold p-2 md:p-4 relative bottom-15 ${
     colorMapping["gray"]
    } dark:text-white`}
    colour={colour}
    >
    {title || "3D Card"}
    </CardItem>
    <CardItem
    as="p"
    translateZ="60"
    className={`text-xs md:text-sm max-w-full md:max-w-sm mt-2 ${
     colorMapping["gray"]
    } dark:text-neutral-300`}
    colour={colour}
    >
    {description ||
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
    </CardItem>
   </div>
   <CardItem translateZ="100" className="w-full md:w-[40%] mt-32 "
    colour={colour}>
    <img
    src={
     image ||
     "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
    height={imageHeight || 1500}
    width={imageWidth || 1300}
    className={`h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl border-2 ${borderMapping[colour ?? "gray"]}`}
    alt="thumbnail"
    />
   </CardItem>
   </div>
   <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-14 gap-4">
   <CardItem
    translateZ={50}
    as="a"
    href="https://twitter.com/mannupaaji"
    target="__blank"
    className={`px-4 py-2 rounded-xl text-xs font-normal hover:${colorMapping[colour?? "grey"]} ${
     colorMapping["gray"]
    } dark:text-white`}
    colour={colour}
   >
    Try now →
   </CardItem>
   <CardItem
    translateZ={20}
    as="button"
    className={`px-4 py-2 rounded-xl hover:${colorMapping[colour ?? "gray"]} text-xs font-bold`}
    style={{ backgroundColor: colour }}
    colour={colour}
   >
    Link
   </CardItem>
   </div>
  </CardBody>
  </CardContainer>
 );
}
