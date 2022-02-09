import { Priority } from "./priority";

export interface Task {
    id : string,
    title : string,
    description : string,
    folderId : string,
    realization : Date,
    creationDate: Date,
    priority : Priority
}