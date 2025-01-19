import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  getDaysInMonth as getDaysInMonthFns,
  getDaysInYear as getDaysInYearFns
} from "date-fns";
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
