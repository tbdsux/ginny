interface GroupColumnPProps {
  col: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: {
    id: string;
    content: string;
  }[];
}

const GroupColumnP = ({ col, tasks }: GroupColumnPProps) => {
  return (
    <div className="my-2 mx-0 w-full rounded-lg border lg:mx-2 lg:w-72 lg:min-w-[18rem]">
      <div className="flex items-center justify-between rounded-t-lg bg-white p-2">
        <h4 className="text-sm">{col.title}</h4>
      </div>

      <hr />

      <div className="rounded-b-lg bg-stone-100 py-2 px-3">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="group relative my-1 cursor-text rounded-md border bg-white py-2 px-4 text-xs"
          >
            {task.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupColumnP;
