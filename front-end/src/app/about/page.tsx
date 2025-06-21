import React from "react";
import { AboutCard } from "./_components/aboutCard";
import { Rocket,ArrowBigRightIcon,LucideWebcam,LucideVibrate } from "lucide-react";
import { Card1Description, Card1Title,Card2Title,Card2Description,Card3Description,Card3Title, Card4Title,Card4Description }from "./_components/card1";
interface aboutCards{
 colour:string;
 direction:"left"|"right";
 title:React.ReactNode;
 Icon:React.ReactNode;
 description?:React.ReactNode;
 image?:string;
 imageAlt?:string;
}
export default function AboutPage() {

 const aboutCards:aboutCards[]= [
 {
colour: "#119EE6",
direction: "left",
title: <Card1Title  />,
image:"image.png",
imageAlt:"PearlPost",
Icon: <Rocket className="w-5 h-5" />,
description: <Card1Description/>,
 },
 {
colour: "#EF476E",
direction: "right",
title: <Card2Title  />,
Icon: <ArrowBigRightIcon className="w-5 h-5" />,
description: <Card2Description/>,
image:"chat.png",
imageAlt:"PearlPost",
 },
 {
colour: "#23C55D",
direction: "left",
title: <Card3Title/>,
Icon: <LucideWebcam className="w-5 h-5" />,
description: <Card3Description/>,
image:"ai.png",
imageAlt:"PearlPost",
 },
 {
colour: "#EFC23B",
direction: "right",
title: <Card4Title></Card4Title>,
Icon: <LucideVibrate className="w-5 h-5" />,
description: <Card4Description/>,
 },
];   

    return (
      <div className="flex flex-col items-center justify-center w-screen h-full">
     {aboutCards.map((card, index) => (
       <AboutCard
      key={index}
      colour={card.colour}
      direction={card.direction}
      title={card.title}
      Icon={card.Icon}
      description={card.description}
      image={card.image}
      imageAlt={card.imageAlt}
       />
     ))}
      </div>
    );
}

