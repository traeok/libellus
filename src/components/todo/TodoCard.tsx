import ReactMarkdown from "react-markdown";
import { Card } from "../Card";
import { TbSquare, TbSquareCheck } from "react-icons/tb";
import remarkGfm from "remark-gfm";
import { FaClock, FaRegCalendarCheck } from "react-icons/fa";
import { Todo } from "@/types/todo";
import { PriorityAsSymbol } from "@/types/priority";

import { replaceTodoInAppdata } from "@/todo/export";

export const TodoCard = ({
  data,
  setTodos,
}: {
  data: Todo;
  setTodos: Function;
}) => {
  const PriorityIcon = PriorityAsSymbol(data.priority);
  const CheckmarkIcon = data.completed ? TbSquareCheck : TbSquare;

  const toggleCompletion = () => {
    setTodos((todos) => {
      const isCompleted = !data.completed;
      const completionDate = isCompleted ? new Date() : undefined;

      const newTodos = [...todos].map((todo) => {
        if (todo === data) {
          return {
            ...data,
            completed: isCompleted,
            completionDate: completionDate,
          };
        }

        return todo;
      });

      replaceTodoInAppdata({
        ...data,
        completed: isCompleted,
        completionDate: completionDate,
      });

      return newTodos;
    });
  };

  return (
    <Card
      className={`pl-2 select-none mb-2 last:mb-0 ${
        data.completed
          ? "opacity-50 hover:opacity-80"
          : "hover:shadow-md dark:hover:shadow-invert-md hover:ring-1 ring-zinc-300 dark:ring-zinc-600"
      } text-zinc-600 dark:text-zinc-100`}
      draggable
    >
      <div className="mr-2">
        <CheckmarkIcon
          className="cursor-pointer"
          size="1.75em"
          onClick={(event) => toggleCompletion()}
        />
      </div>
      <div className={`flex flex-col select-text p-1`}>
        <article className="prose prose-zinc dark:prose-invert prose-h1:mb-1">
          <ReactMarkdown remarkPlugins={[remarkGfm]} children={data.title} />
        </article>
        <div
          className={`min-[401px]:hidden flex ${data.projects ? " py-1" : ""}`}
        >
          {data.projects?.map((proj) => (
            <div className="px-2 mr-2 last:mr-0 rounded-xl text-center bg-teal-500 text-white font-bold">
              {proj}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center ml-auto">
        {data.completed && data.completionDate ? (
          <div className="flex p-1 py-0 mr-2 items-center hover:ring-1 rounded-md ring-zinc-400 dark:ring-zinc-300 bg-zinc-300 dark:bg-zinc-600">
            {/* <div className="select-none pointer-events-none p-1 bg-zinc-500 rounded-l-md dark:bg-zinc-400 text-zinc-50 font-bold px-2">
              done
            </div> */}
            <FaRegCalendarCheck className="mr-2" />
            <div className="pb-[1px]">
              {data.completionDate.toLocaleDateString(navigator.language)}
            </div>
          </div>
        ) : null}
        {data.date ? (
          <div
            className={`${
              data.completed ? "max-[600px]:hidden" : ""
            } flex p-1 py-0 mr-1 align-center items-center hover:ring-1 rounded-md ring-zinc-400 dark:ring-zinc-300 bg-zinc-300 dark:bg-zinc-600`}
          >
            <FaClock className="mr-2" />
            <div className="pb-[1px]">
              {data.date.toLocaleDateString(navigator.language)}
            </div>
          </div>
        ) : null}
        <div className="max-[400px]:hidden flex items-center">
          {data.projects?.map((proj) => (
            <div className="select-text px-1 mx-1 rounded-xl text-center bg-teal-500 text-white font-bold">
              {proj}
            </div>
          ))}
        </div>
        {PriorityIcon ? <PriorityIcon className="ml-1" size="1.5em" /> : null}
      </div>
    </Card>
  );
};
