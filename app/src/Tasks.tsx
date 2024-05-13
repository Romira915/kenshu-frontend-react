import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  Task,
  updateTask,
} from "./repository.ts";

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

const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });
};

const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });
};

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });
};

export const TaskItem = ({ task }: { task: Task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateTask = useUpdateTask();
  const completeTask = useCompleteTask();
  const deleteTask = useDeleteTask();

  return (
    <li className="flex justify-between items-center">
      {isEditing ? (
        <input
          type="text"
          title="Task Title"
          defaultValue={task.title}
          onKeyDown={(e) => {
            if (!e.nativeEvent.isComposing && e.key === "Enter") {
              updateTask.mutate({ ...task, title: e.currentTarget.value });
              setIsEditing(false);
            }
          }}
          className="bg-gray-700 py-2 px-2 rounded w-fit"
        />
      ) : (
        <h4 className={task.finishedAt && "line-through"}>{task.title}</h4>
      )}
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded"
          onClick={() => completeTask.mutate(task.id)}
        >
          Complete
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded"
          onClick={() => {
            if (confirm("Are you sure you want to delete this task?")) {
              deleteTask.mutate(task.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
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
          <TaskItem key={index} task={task} />
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
