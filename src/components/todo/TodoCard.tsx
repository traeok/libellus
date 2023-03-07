import ReactMarkdown from "react-markdown";
import { Card } from "../Card";
import { TbSquare, TbSquareCheck } from "react-icons/tb";
import { IconType } from "react-icons";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { FaCalendarCheck, FaClock, FaRegCalendarCheck } from "react-icons/fa";
import { Todo } from "@/types/todo";
import { PriorityAsSymbol } from "@/types/priority";

export const TodoCard = ({ data }: { data: Todo }) => {
  const PriorityIcon = PriorityAsSymbol(data.priority);

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
      className={`pl-2 select-none mb-2 last:mb-0 ${
        complete
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
        {/* <div className={`flex${data.projects ? " py-1" : ""}`}>
          {data.projects?.map((proj) => (
            <div className="px-2 mr-2 last:mr-0 rounded-xl text-center bg-teal-500 text-white font-bold">
              {proj}
            </div>
          ))}
        </div> */}
      </div>
      <div className="flex items-center ml-auto mx-1">
        {complete && completedDate ? (
          <div className="flex p-1 py-0 mx-1 items-center hover:ring-1 rounded-md ring-zinc-400 dark:ring-zinc-300 bg-zinc-300 dark:bg-zinc-600">
            {/* <div className="select-none pointer-events-none p-1 bg-zinc-500 rounded-l-md dark:bg-zinc-400 text-zinc-50 font-bold px-2">
              done
            </div> */}
            <FaRegCalendarCheck className="mr-2" />
            <div>{completedDate.toLocaleDateString(navigator.language)}</div>
          </div>
        ) : null}
        {data.date ? (
          <div
            className={`${
              complete ? "max-[600px]:hidden" : ""
            } flex p-1 py-0 mx-1 items-center hover:ring-1 rounded-md ring-zinc-400 dark:ring-zinc-300 bg-zinc-300 dark:bg-zinc-600`}
          >
            {/* <div className="select-none pointer-events-none p-1 bg-zinc-500 rounded-l-md dark:bg-zinc-400 text-zinc-50 font-bold px-2">
              done
            </div> */}
            <FaClock className="mr-2" />
            <div>{data.date.toLocaleDateString(navigator.language)}</div>
          </div>
        ) : null}
        <div className="flex items-center mx-1">
          {data.projects?.map((proj) => (
            <div className="select-text px-2 mr-1 last:mr-0 rounded-xl text-center bg-teal-500 text-white font-bold">
              {proj}
            </div>
          ))}
        </div>
        {PriorityIcon ? <PriorityIcon size="1.5em" className="ml-1" /> : null}
      </div>
    </Card>
  );
};
