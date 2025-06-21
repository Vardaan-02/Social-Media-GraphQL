"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/ui/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isResetting = useRef(false);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  // Auto-scroll + loop with safe reset
  useEffect(() => {
    const scrollContainer = ref.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      if (isResetting.current) return;

      const atBottom =
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 1;

      if (atBottom) {
        isResetting.current = true;

        scrollContainer.scrollTo({
          top: 0,
          behavior: "smooth",
        });

    
        setTimeout(() => {
          isResetting.current = false;
        }, 1000); 
      } else {
        scrollContainer.scrollTop += 0.3;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative flex h-[15rem] w-full max-w-7xl justify-center space-x-6 overflow-y-auto rounded-xl p-6 backdrop-blur-md bg-transparent scrollbar-hide"
      ref={ref}
    >
      <div className="flex items-start px-6">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-6">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.4 }}
                className="text-2xl font-semibold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.4 }}
                className="mt-2 text-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-10" />
        </div>
      </div>
    </motion.div>
  );
};
