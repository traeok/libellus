import moment from "moment";
import {
  FaClock,
  FaExclamation,
  FaRegCalendarCheck,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
} from "react-icons/fa";
import { MdPriorityHigh, MdUpdate } from "react-icons/md";
import { priorityAsNumber } from "./priority";
import { Todo } from "./todo";

export enum SortBy {
  CompletionDate,
  DueDate,
  MostRecent,
  Priority,
  AtoZ,
  ZtoA,
}

export enum SortDirection {
  Normal,
  Reverse,
}

export const SortOptions = [
  {
    value: SortBy.CompletionDate,
    icon: FaRegCalendarCheck,
    title: "Completed",
  },
  {
    value: SortBy.DueDate,
    icon: FaClock,
    title: "Due date",
  },
  {
    value: SortBy.MostRecent,
    icon: MdUpdate,
    title: "Most recent",
  },
  {
    value: SortBy.Priority,
    icon: FaExclamation,
    title: "Priority",
  },
  {
    value: SortBy.AtoZ,
    icon: FaSortAlphaDown,
    title: "A to Z",
  },
  {
    value: SortBy.ZtoA,
    icon: FaSortAlphaDownAlt,
    title: "Z to A",
  },
];

export const sortTodos = (sort: Exclude<SortBy, SortBy.MostRecent>) => {
  switch (sort) {
    case SortBy.CompletionDate:
      return (a: Todo, b: Todo): number => {
        if (!a.completed && !b.completed) {
          return 0;
        }
        if (a.completed) {
          if (b.completed) {
            return moment(a.completionDate).diff(moment(b.completionDate));
          }

          return -1;
        }

        return 1;
      };
    case SortBy.DueDate:
      return (a: Todo, b: Todo): number => {
        if (a.date) {
          if (b.date) {
            return moment(a.date).diff(moment(b.date));
          }

          return -1;
        }

        return 1;
      };
    case SortBy.Priority:
      return (a: Todo, b: Todo): number => {
        if (a.priority === b.priority) {
          return 0;
        }

        return priorityAsNumber(a.priority) > priorityAsNumber(b.priority)
          ? -1
          : 1;
      };
    case SortBy.AtoZ:
      return (a: Todo, b: Todo): number => {
        return a.title < b.title ? -1 : 1;
      };
    case SortBy.ZtoA:
      return (a: Todo, b: Todo): number => {
        return a.title > b.title ? -1 : 1;
      };
  }
};
