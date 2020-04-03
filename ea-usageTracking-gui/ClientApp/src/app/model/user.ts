import { Role } from "./role";
import { Guid } from "guid-typescript";

export class User {
    id: Guid;
    name: string;
    email: string;
    dateCreated: string;
}
