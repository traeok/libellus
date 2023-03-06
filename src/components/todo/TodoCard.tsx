import ReactMarkdown from "react-markdown";
import { Card } from "../Card";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { TbSquare, TbSquareCheck } from "react-icons/tb";
import { IconType } from "react-icons";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { FaCalendarCheck, FaClock, FaRegCalendarCheck } from "react-icons/fa";
import { Todo } from "@/types/todo";

const getPriorityIcon = (priority?: string) => {
  switch (priority) {
    case "low":
      return FcLowPriority;
    case "medium":
      return FcMediumPriority;
    case "high":
      return FcHighPriority;
    default:
      return null;
  }
};

export const TodoCard = ({ data }: { data: Todo }) => {
  const PriorityIcon = getPriorityIcon(data.priority);
  const isLgScreenQuery = window.matchMedia("(min-width: 769px)").matches;

  const [complete, setComplete] = useState(data.completed);
  const [completedDate, setCompletedDate] = useState(data.completionDate);
  const CheckmarkIcon = complete ? TbSquareCheck : TbSquare;

  const toggleCompletion = () => {
    setComplete((val) => {
      if (!val) {
        setCompletedDate(new Date());
      }

      return !val;
    });
  };

  return (
    <Card
      className={`pl-4 select-none mb-2 last:mb-0 ${
        complete
          ? "opacity-50 hover:opacity-80"
          : "hover:shadow-md dark:hover:shadow-invert-md hover:ring-1 ring-zinc-300 dark:ring-zinc-600"
      } text-zinc-600 dark:text-zinc-100`}
      draggable
    >
      <div className="mr-4">
        <CheckmarkIcon
          className="cursor-pointer"
          size="1.75em"
          onClick={(event) => toggleCompletion()}
        />
      </div>
      <div
        className={`flex flex-col ${
          data.projects && !isLgScreenQuery ? "mb-2" : ""
        } select-text p-2`}
      >
        <article className="prose prose-zinc dark:prose-invert prose-h1:mb-1">
          <ReactMarkdown remarkPlugins={[remarkGfm]} children={data.title} />
        </article>
        {/* {isLgScreenQuery ? null : ( */}
        <div className={`flex${data.projects ? " py-1" : ""}`}>
          {data.projects?.map((proj) => (
            <div className="px-2 mr-2 last:mr-0 rounded-xl text-center bg-teal-500 text-white font-bold">
              {proj}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center ml-auto mr-2">
        {/* {isLgScreenQuery ? (
          <div className="flex items-center mr-2">
            {data.projects?.map((proj) => (
              <div className="select-text px-2 mr-2 last:mr-0 rounded-xl text-center bg-teal-500 text-white font-bold">
                {proj}
              </div>
            ))}
          </div>
        ) : null} */}
        {complete && completedDate ? (
          <div className="flex p-1 px-2 mr-2 items-center hover:ring-1 rounded-md ring-zinc-400 dark:ring-zinc-300 bg-zinc-300 dark:bg-zinc-600">
            {/* <div className="select-none pointer-events-none p-1 bg-zinc-500 rounded-l-md dark:bg-zinc-400 text-zinc-50 font-bold px-2">
              done
            </div> */}
            <FaRegCalendarCheck className="mr-2" />
            <div>{completedDate.toLocaleDateString(navigator.language)}</div>
          </div>
        ) : null}
        {data.date ? (
          <div className="flex p-1 px-2 items-center hover:ring-1 rounded-md ring-zinc-400 dark:ring-zinc-300 bg-zinc-300 dark:bg-zinc-600">
            {/* <div className="select-none pointer-events-none p-1 bg-zinc-500 rounded-l-md dark:bg-zinc-400 text-zinc-50 font-bold px-2">
              done
            </div> */}
            <FaClock className="mr-2" />
            <div>{data.date.toLocaleDateString(navigator.language)}</div>
          </div>
        ) : null}
        {PriorityIcon ? <PriorityIcon size="1.5em" className="ml-2" /> : null}
      </div>
    </Card>
  );
};
