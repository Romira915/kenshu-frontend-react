import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getTasks, Task } from "./repository.ts";

const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};

const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });
};

export const Tasks = () => {
  const fetchTasks = useTasks();
  const createTask = useCreateTask();

  if (fetchTasks.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (fetchTasks.isError) {
    return <h1>Error: {String(fetchTasks.error)}</h1>;
  }

  return (
    <main className="container mx-auto flex flex-col gap-8 p-8 text-white">
      <h1 className="text-7xl">Tasks</h1>
      <ul className="flex flex-col gap-4">
        {fetchTasks.data.tasks.map((task: Task, index) => (
          <li key={index}>{task.title}</li>
        ))}
      </ul>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-fit self-center"
        onClick={() => createTask.mutate()}
      >
        Create Task
      </button>
    </main>
  );
};
