import React from "react";
import { Cover } from "@/ui/components/ui/cover";
import { StickyScroll } from "@/ui/components/ui/sticky-scroll-reveal";

export function Card1Title() {
  return (
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 pt-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Post Amazing Stories <br /> At <Cover>Warp Speed</Cover>
      </h1>
    </div>
  );
}
const content = [
 {
  title: "Post Amazing Stories",
  description:
   "Collaborate seamlessly with your team in real time and enhance your storytelling workflow.",
 },
 {
  title: "Real-Time Updates",
  description:
   "Monitor every change instantly and simplify version control for a smoother experience.",
 },
 {
  title: "Intuitive UI/UX Dashboard",
  description:
   "Work effortlessly with a modern dashboard that keeps your team aligned and productive.",
 },
 {
  title: "Integrated Real-Time Messenger",
  description:
   "Stay connected and maintain uninterrupted communication to boost your workflow.",
 },
];

export function Card1Description(){
 return(
  <div className="w-full h-fit relative bottom-5">
      <StickyScroll content={content} />
  </div>
 )
}

export function Card2Title() {
  return (
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 pt-6 bg-clip-text text-transparent bg-gradient-to-b from-blue-800 via-blue-700 to-blue-700 dark:from-blue-800 dark:via-white dark:to-white">
        Effortless <Cover>Collaboration</Cover> <br />
      </h1>
    </div>
  );
}

const content2 = [
  {
    title: "Real-Time WebSocket Connection",
    description:
      "Experience instant connectivity and communication with real-time WebSocket integration.",
  },
  {
    title: "Real-Time Dashboard Updates",
    description:
      "See changes reflected immediately on your dashboard for a truly dynamic workflow.",
  },
  {
    title: "Real-Time Workspace",
    description:
      "Collaborate live with your team in a synchronized, always-updated workspace.",
  },
];

export function Card2Description() {
  return (
    <div className="w-full h-fit relative bottom-5">
      <StickyScroll content={content2} />
    </div>
  );

}



export function Card3Title() {
  return (
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 pt-6 bg-clip-text text-transparent bg-gradient-to-b from-purple-800 via-purple-700 to-purple-700 dark:from-purple-800 dark:via-white dark:to-white">
        AI-Powered <Cover>Enhancements</Cover>
      </h1>
    </div>
  );
}

const content3 = [
  {
    title: "AI Integration",
    description:
      "Leverage advanced AI tools to streamline your workflow and unlock new creative possibilities.",
  },
  {
    title: "Personalized Chat Bot",
    description:
      "Get instant support and tailored recommendations with your own intelligent chat assistant.",
  },
  {
    title: "Enhanced Post Features",
    description:
      "Boost your content with AI-driven suggestions, smart formatting, and automated enhancements.",
  },
];

export function Card3Description() {
  return (
    <div className="w-full h-fit relative bottom-5">
      <StickyScroll content={content3} />
    </div>
  );
}

export function Card4Title() {
  return (
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 pt-6 bg-clip-text text-transparent bg-gradient-to-b from-green-800 via-green-700 to-green-700 dark:from-green-800 dark:via-white dark:to-white">
        Secure & <Cover>Reliable</Cover>
      </h1>
    </div>
  );
}

const content4 = [
  {
    title: "End-to-End Encryption",
    description:
      "Protect your data and conversations with robust end-to-end encryption.",
  },
  {
    title: "99.99% Uptime",
    description:
      "Rely on a platform built for stability and performance, ensuring your work is always accessible.",
  },
  {
    title: "Granular Access Control",
    description:
      "Manage permissions and roles with fine-grained access control for your team.",
  },
];

export function Card4Description() {
  return (
    <div className="w-full h-fit relative bottom-5">
      <StickyScroll content={content4} />
    </div>
  );
}

