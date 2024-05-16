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

export const updateTask = async (task: Task): Promise<Task> => {
    return await (
        await fetch(`${TASK_API_BASE_URL}/api/tasks/${task.id}`, {
            method: "PATCH",
            body: JSON.stringify(task),
        })
    ).json();
}

export const completeTask = async (task_id: number): Promise<Task> => {
    return await (
        await fetch(`${TASK_API_BASE_URL}/api/tasks/${task_id}`, {
            method: "PATCH",
            body: JSON.stringify({ finishedAt: new Date().toISOString() }),
        })
    ).json();
}

export const deleteTask = async (task_id: number): Promise<void> => {
    await fetch(`${TASK_API_BASE_URL}/api/tasks/${task_id}`, {
        method: "DELETE",
    });
}
