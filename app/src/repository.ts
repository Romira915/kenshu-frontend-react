const TASK_API_BASE_URL = "http://localhost:8000";

export type Task = {
    id: number;
    title: string;
    createdAt: string;
    finishedAt: string | null;
};

export type TasksList = {
    tasks: Task[];
};

export const getTasks = async (): Promise<TasksList> => {
    return await (await fetch(`${TASK_API_BASE_URL}/api/tasks`)).json();
};

export const createTask = async (): Promise<Task> => {
    return await (
        await fetch(`${TASK_API_BASE_URL}/api/tasks`, {
            method: "POST",
        })
    ).json();
}
