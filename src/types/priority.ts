import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

export enum Priority {
  None = "",
  Low = "(!)",
  Medium = "(!!)",
  High = "(!!!)",
}

export const priorityAsNumber = (priority: Priority): number => {
  switch (priority) {
    case Priority.None:
      return 0;
    case Priority.Low:
      return 1;
    case Priority.Medium:
      return 2;
    case Priority.High:
      return 3;
  }
};

export const PriorityAsSymbol = (priority: Priority) => {
  switch (priority) {
    case Priority.Low:
      return FcLowPriority;
    case Priority.Medium:
      return FcMediumPriority;
    case Priority.High:
      return FcHighPriority;
    default:
      return null;
  }
};

export const priorityFromRegex = (priorityMatch: string | undefined) => {
  switch (priorityMatch?.length) {
    case 1:
      return Priority.Low;
    case 2:
      return Priority.Medium;
    case 3:
      return Priority.High;
    default:
      return Priority.None;
  }

  return Priority.None;
};

export const findPriority = (input: string): Priority => {
  const match = input.match(/\((!{1,3})\)/g);
  if (!match) {
    return Priority.None;
  }

  return priorityFromRegex(match[0]);
};

export const hasPriority = (input: string): boolean => {
  return /\(!{1,3}\)/g.test(input);
};

export const removePriority = (input: string): string => {
  return input.replace(/\(!{1,3}\)/g, "").trim();
};
