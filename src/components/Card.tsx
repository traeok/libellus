import { TbGripVertical } from "react-icons/tb";

export const Card = ({
  children,
  className,
  draggable,
}: {
  children: any;
  className: string;
  draggable: boolean;
}) => {
  return (
    <div
      className={`flex items-center rounded-md bg-zinc-200 dark:bg-zinc-800 p-2 ${className} ${
        draggable ? "pl-2" : ""
      }`}
    >
      {/* {draggable ? <TbGripVertical className="mr-2 opacity-25 hover:opacity-75 cursor-ns-resize" /> : null} */}
      {children}
    </div>
  );
};
