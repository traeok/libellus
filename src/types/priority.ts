import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

export const enum Priority {
  None = "",
  Low = "low",
  Medium = "medium",
  High = "high",
}

export const PriorityAsSymbol = (priority: Priority) => {
  switch (priorityAsMd(priority)) {
    case "(!)":
      return FcLowPriority;
    case "(!!)":
      return FcMediumPriority;
    case "(!!!)":
      return FcHighPriority;
    default:
      return null;
  }
};

export const priorityAsMd = (priority: Priority): string => {
  switch (priority) {
    case Priority.Low:
      return "(!)";
    case Priority.Medium:
      return "(!!)";
    case Priority.High:
      return "(!!!)";
    case Priority.None:
      return "";
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
