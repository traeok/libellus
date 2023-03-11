import { todoFromString } from "@/todo/import";
import { priorityAsMd } from "@/types/priority";
import { Todo } from "@/types/todo";
import { appendFileSync, readFileSync, writeFileSync } from "fs";
import { join as joinPath } from "path";
import { env, platform } from "process";

export const buildTodoString = (newTodo: Todo): string =>
  `- ${
    newTodo.completed
      ? `[Completed${
          newTodo.completionDate
            ? ` ${newTodo.completionDate.toLocaleDateString(
                navigator.language,
                { month: "2-digit", day: "2-digit", year: "numeric" }
              )}`
            : ""
        }] `
      : ""
  }${priorityAsMd(newTodo.priority)} ${newTodo.title}${
    newTodo.projects
      ? ` ${newTodo.projects?.map((proj) => `+${proj}`).join(" ")}`
      : ""
  }${
    newTodo.date
      ? ` {${newTodo.date.toLocaleDateString(navigator.language, {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}}`
      : ""
  }`;

export const createAndExportTodo = (input: string): Todo => {
  const newTodo = todoFromString(input);
  const appdataPath =
    env.APPDATA ||
    (platform == "darwin"
      ? env.HOME + "/Library/Preferences"
      : env.HOME + "/.local/share");
  const localTodoPath = joinPath(appdataPath, "libellus", "todo.md");
  try {
    appendFileSync(localTodoPath, buildTodoString(newTodo));
    appendFileSync(localTodoPath, "\n");
  } catch (err) {}

  return newTodo;
};

export const replaceTodoInAppdata = (newTodo: Todo) => {
  const appdataPath =
    env.APPDATA ||
    (platform == "darwin"
      ? env.HOME + "/Library/Preferences"
      : env.HOME + "/.local/share");
  const localTodoPath = joinPath(appdataPath, "libellus", "todo.md");

  const buffer = readFileSync(localTodoPath).toString();
  const lines = buffer.split(/\r?\n/).map((line) => {
    if (line.includes(newTodo.title)) {
      return buildTodoString(newTodo);
    }

    return line;
  });

  writeFileSync(localTodoPath, lines.join("\n").concat("\n"));
};
