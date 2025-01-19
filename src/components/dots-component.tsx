import { getDaysInMonth, getDaysInYear } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";

type MeasureType =
  | "seconds"
  | "minutes"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";
const measures: MeasureType[] = [
  "seconds",
  "minutes",
  "hour",
  "day",
  "week",
  "month"
];
const measures_against: MeasureType[] = [
  "minutes",
  "hour",
  "day",
  "week",
  "month",
  "year"
];

const DotsComponent = () => {
  const [measure, setMeasure] = React.useState<MeasureType>("day");
  const [against, setAgainst] = React.useState<MeasureType>("year");
  const dots = React.useMemo(() => generateDots(measure), [measure]);
  return (
    <main className="flex flex-col justify-between w-full space-y-5">
      <p className="text-2xl text-center">Life in Dots</p>
      <ScrollArea className="h-[80vh] w-full ">
        <div className="flex flex-row flex-wrap items-center gap-2 size-full">
          <AnimatePresence>
            {dots.map((_, i) => (
              <Dots key={i} measure={measure} />
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
      <div className="flex items-center">
        <Select
          value={measure}
          onValueChange={(val: MeasureType) => setMeasure(val)}
        >
          <SelectTrigger className="w-[100px] capitalize">
            <SelectValue placeholder="Measure" />
          </SelectTrigger>
          <SelectContent>
            {measures.map((m) => (
              <SelectItem value={m} key={m} className="capitalize">
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="px-2">In a</p>
        <Select
          value={against}
          onValueChange={(val: MeasureType) => setAgainst(val)}
        >
          <SelectTrigger className="w-[100px] capitalize">
            <SelectValue placeholder="Measure" />
          </SelectTrigger>
          <SelectContent>
            {measures_against.map((m) => (
              <SelectItem value={m} key={m} className="capitalize">
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </main>
  );
};

export { DotsComponent };

const Dots = ({ measure }: { measure: MeasureType }) => {
  const active = React.useMemo(() => {
    switch (measure) {
      case "day":
        return Math.random() > 0.5;
      case "week":
        return Math.random() > 0.5;
      case "month":
        return Math.random() > 0.5;
      case "year":
        return Math.random() > 0.5;
      default:
        return Math.random() > 0.5;
    }
  }, [measure]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-full size-2"
    />
  );
};

const generateDots = (measure: MeasureType) => {
  switch (measure) {
    case "day":
      return Array.from({ length: 24 }, (_, i) => i);
    case "week":
      return Array.from({ length: 7 }, (_, i) => i);
    case "month": {
      const days = getDaysInMonth(new Date());
      return Array.from({ length: days }, (_, i) => i);
    }
    case "year": {
      const days = getDaysInYear(new Date());
      return Array.from({ length: days }, (_, i) => i);
    }
    default: {
      const days = getDaysInYear(new Date());
      return Array.from({ length: days }, (_, i) => i);
    }
  }
};
