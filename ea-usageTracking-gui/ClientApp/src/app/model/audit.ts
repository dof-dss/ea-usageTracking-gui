import { Application } from "./application";

export interface Audits {
    data : Audit[],
    pageNumber: number,
    pageSize: number,
    nextPage: string,
    previousPage: string
  }

export interface Audit {
    id: number;
    auditApplication: Application;
    dateCreated: string;
    subjectId: number;
    subject: string;
    actorId: number;
    actor: string;
    description: string;
    properties: string;
    expanded: boolean;
}

