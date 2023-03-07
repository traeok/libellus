import { todoFromString } from "@/todo/import";
import { priorityAsMd } from "@/types/priority";
import { Todo } from "@/types/todo";
import { appendFileSync } from "fs";
import { join as joinPath } from "path";
import { env, platform } from "process";

export const createAndExportTodo = (input: string): Todo => {
  const newTodo = todoFromString(input);
  const appdataPath =
    env.APPDATA ||
    (platform == "darwin"
      ? env.HOME + "/Library/Preferences"
      : env.HOME + "/.local/share");
  const localTodoPath = joinPath(appdataPath, "libellus", "todo.md");
  try {
    appendFileSync(
      localTodoPath,
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
      }`
    );
    appendFileSync(localTodoPath, "\n");
  } catch (err) {}

  return newTodo;
};
