import { Priority } from "./priority";

export type Todo = {
  completed?: boolean;
  completionDate?: Date;
  date?: Date;
  title: string;
  priority: Priority;
  projects: string[];
};
