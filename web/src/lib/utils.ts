import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatRelativeDate = (date: Date | string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "Now";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute ago" : "minutes ago"}`;
  }

  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour ago" : "hours ago"}`;
  }

  if (diffInDays === 1) {
    return "Yesterday";
  }

  return `${diffInDays} ${diffInDays === 1 ? "day ago" : "days ago"}`;
};
