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
import {
  cn,
  generateDots,
  getActiveDay,
  getPercentageLeft,
  measures,
  MeasureType
} from "@/lib/utils";
import useSWR from "swr";

const DotsComponent = () => {
  const [measure, setMeasure] = React.useState<MeasureType>("day");
  const [against, setAgainst] = React.useState<MeasureType>("year");
  const { data: dots } = useSWR([measure, against], generateDots);

  const percentageLeft = React.useMemo(
    () => getPercentageLeft(measure, against),
    [measure, against]
  );

  return (
    <main className="flex flex-col justify-between w-full space-y-5">
      <p className="text-2xl text-center">Life in Dots</p>
      <ScrollArea className="h-[80vh] w-full ">
        <div className="flex flex-row flex-wrap items-center gap-2 size-full">
          <AnimatePresence>
            {dots?.map((_, i) => (
              <Dots key={i} measure={measure} against={against} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
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
          <p>In a</p>
          <Select
            value={against}
            onValueChange={(val: MeasureType) => setAgainst(val)}
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
        </div>
        <p>{percentageLeft}% Left</p>
      </div>
    </main>
  );
};

export { DotsComponent };

const Dots = ({
  measure,
  against,
  index
}: {
  measure: MeasureType;
  against: MeasureType;
  index: number;
}) => {
  const active = React.useMemo(
    () => getActiveDay(measure, against)(index),
    [measure, against, index]
  );

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(" rounded-full size-2 text-[10px] text-black", {
        "bg-white": active,
        "bg-neutral-700": !active
      })}
    ></motion.div>
  );
};
