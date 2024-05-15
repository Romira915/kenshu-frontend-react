import { useQuery } from "@tanstack/react-query";
import { getTasks, Task } from "./repository.ts";

export const Tasks = () => {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (query.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (query.isError) {
    return <h1>Error: {String(query.error)}</h1>;
  }

  return (
    <main className="container mx-auto flex flex-col gap-8 p-8 text-white">
      <h1 className="text-7xl">Tasks</h1>
      <ul className="flex flex-col gap-4">
        {query.data.tasks.map((task: Task, index) => (
          <li key={index}>{task.title}</li>
        ))}
      </ul>
    </main>
  );
};
