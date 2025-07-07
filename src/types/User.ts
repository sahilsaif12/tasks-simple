import { Task } from "./Task";

export interface User {
  username: string;
  createdAt: string;
  tasks: Task[];
}
