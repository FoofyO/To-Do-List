import { Task } from "../../task/models/task";

export interface Folder {
    id: string,
    title: string,
    userId: string,
    date: Date,
    tasks: Array<Task>
}