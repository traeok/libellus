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
  switch (priority) {
    case Priority.Low:
      return FcLowPriority;
    case Priority.Medium:
      return FcMediumPriority;
    case Priority.High:
      return FcHighPriority;
    case Priority.None:
      return null;
  }
};

export const PriorityAsMd = (priority: Priority) => {
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
