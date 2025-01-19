import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  getDaysInMonth as getDaysInMonthFns,
  getDaysInYear as getDaysInYearFns
} from "date-fns";

export type MeasureType =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export const measures: MeasureType[] = [
  // "second",
  // "minute",
  // "hour",
  "day",
  "week",
  "month",
  "year"
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSecondsInMinute = () => 60;
export const getSecondsInHour = () => 60 * 60;
export const getSecondsInDay = () => 24 * 60 * 60;
export const getSecondsInWeek = () => 7 * 24 * 60 * 60;
export const getSecondsInMonth = () => getDaysInMonth() * 24 * 60 * 60;
export const getSecondsInYear = () => getDaysInYear() * 24 * 60 * 60;

export const getMinutesInHour = () => 60;
export const getMinutesInDay = () => 24 * 60;
export const getMinutesInWeek = () => 7 * 24 * 60;
export const getMinutesInMonth = () => getDaysInMonth() * 24 * 60;
export const getMinutesInYear = () => getDaysInYear() * 24 * 60;

export const getHoursInDay = () => 24;
export const getHoursInWeek = () => 7 * 24;
export const getHoursInMonth = () => getDaysInMonth() * 24;
export const getHoursInYear = () => getDaysInYear() * 24;

export const getDaysInWeek = () => 7;
export const getDaysInMonth = () => getDaysInMonthFns(new Date());
export const getDaysInYear = () => getDaysInYearFns(new Date());

export const getWeeksInMonth = () => getDaysInMonth() / 7;
export const getWeeksInYear = () => getDaysInYear() / 7;

export const getMonthsInYear = () => 12;

// getActiveDay

export const getDayInWeek = (date: Date) => date.getDay();
export const getDayInMonth = (date: Date) => date.getDate();
export const getDayInYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export const getPercentageLeft = (
  measure: MeasureType,
  against: MeasureType
) => {
  switch (`${measure}-${against}` as CompareType) {
    case "day-week":
      return Math.floor(
        ((getDaysInWeek() - getDayInWeek(new Date())) / getDaysInWeek()) * 100
      );
    case "day-month":
      return Math.floor(
        ((getDaysInMonth() - getDayInMonth(new Date())) / getDaysInMonth()) *
          100
      );
    case "day-year":
      return Math.floor(
        ((getDaysInYear() - getDayInYear(new Date())) / getDaysInYear()) * 100
      );
    case "week-month":
      return Math.floor(
        ((getWeeksInMonth() - getDayInMonth(new Date()) / 7) /
          getWeeksInMonth()) *
          100
      );
    case "week-year":
      return Math.floor(
        ((getWeeksInYear() - getDayInYear(new Date()) / 7) / getWeeksInYear()) *
          100
      );
    case "month-year":
      return Math.floor(
        ((getMonthsInYear() - new Date().getMonth()) / getMonthsInYear()) * 100
      );
    default:
      return 0;
  }
};

export const getActiveDay = (measure: MeasureType, against: MeasureType) => {
  switch (`${measure}-${against}` as CompareType) {
    case "day-week": {
      const currentDay = getDayInWeek(new Date());
      return (index: number) => index > currentDay;
    }
    case "day-month": {
      const currentDay = getDayInMonth(new Date());
      return (index: number) => index > currentDay;
    }
    case "day-year": {
      const currentDay = getDayInYear(new Date());
      return (index: number) => index > currentDay;
    }

    case "week-month": {
      const currentWeek = Math.floor(getDayInMonth(new Date()) / 7);
      return (index: number) => index > currentWeek;
    }
    case "week-year": {
      const currentWeek = Math.floor(getDayInYear(new Date()) / 7);
      return (index: number) => index > currentWeek;
    }
    case "month-year": {
      const currentMonth = new Date().getMonth();
      return (index: number) => index > currentMonth;
    }
    default:
      return () => true;
  }
};

const generateArray = (length: number) => Array.from({ length }, (_, i) => i);
export type CompareType = `${MeasureType}-${MeasureType}`;
export const generateDots = async (measure_against: MeasureType[]) => {
  const [measure, against] = measure_against;
  const measureIndex = measures.indexOf(measure);
  const againstIndex = measures.indexOf(against);

  if (measureIndex < 0 || againstIndex < 0 || measureIndex >= againstIndex) {
    throw new Error("Invalid measure or against");
  }
  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      switch (`${measure}-${against}` as CompareType) {
        case "second-minute":
          resolve(generateArray(getSecondsInMinute()));
          break;
        case "second-hour":
          resolve(generateArray(getSecondsInHour()));
          break;
        case "second-day":
          resolve(generateArray(getSecondsInDay()));
          break;
        case "second-week":
          resolve(generateArray(getSecondsInWeek()));
          break;
        case "second-month":
          resolve(generateArray(getSecondsInMonth()));
          break;
        case "second-year":
          resolve(generateArray(getSecondsInYear()));
          break;
        case "minute-hour":
          resolve(generateArray(getMinutesInHour()));
          break;
        case "minute-day":
          resolve(generateArray(getMinutesInDay()));
          break;
        case "minute-week":
          resolve(generateArray(getMinutesInWeek()));
          break;
        case "minute-month":
          resolve(generateArray(getMinutesInMonth()));
          break;
        case "minute-year":
          resolve(generateArray(getMinutesInYear()));
          break;
        case "hour-day":
          resolve(generateArray(getHoursInDay()));
          break;
        case "hour-week":
          resolve(generateArray(getHoursInWeek()));
          break;
        case "hour-month":
          resolve(generateArray(getHoursInMonth()));
          break;
        case "hour-year":
          resolve(generateArray(getHoursInYear()));
          break;
        case "day-week":
          resolve(generateArray(getDaysInWeek()));
          break;
        case "day-month":
          resolve(generateArray(getDaysInMonth()));
          break;
        case "day-year":
          resolve(generateArray(getDaysInYear()));
          break;
        case "week-month":
          resolve(generateArray(getWeeksInMonth()));
          break;
        case "week-year":
          resolve(generateArray(getWeeksInYear()));
          break;
        case "month-year":
          resolve(generateArray(getMonthsInYear()));
          break;
        default:
          throw new Error("Invalid comparison");
      }
    }, 0);
  });
};
