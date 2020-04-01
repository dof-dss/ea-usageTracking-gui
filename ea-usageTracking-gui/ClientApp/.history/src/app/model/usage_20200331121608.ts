import { Application } from './application';

export interface Usages {
    data: Usage[],
    pageNumber: number,
    pageSize: number,
    nextPage: string,
    previousPage: string
  }

export interface Usage {
    id: number;
    usageApplication: Application;
    dateCreated: string;
    subjectId: number;
    subject: string;
    actorId: number;
    actor: string;
    description: string;
    properties: string;
    expanded: boolean;
}