import { List } from "./lists";

export interface Project {
    id: number;
    name: string;
    description: string;
    lists: List[];
}
