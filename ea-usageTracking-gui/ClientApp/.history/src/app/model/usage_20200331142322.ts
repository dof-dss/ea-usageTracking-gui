import { Application } from './application';
import { Guid } from 'guid-typescript';

export interface Usages {
    data: Usage[];
    pageNumber: number;
    pageSize: number;
    nextPage: string;
    previousPage: string;
  }

export interface Usage {
    id: number;
    applicationId: number;
    applicationEventId: number;
    applicationUserId: Guid;
    applicationUserName: string;
    applicationEventName: string;
    applicationName: string;
    dateCreated: string;
    isComplete: boolean;
}

"id": 264821,
"applicationId": 3,
"applicationEventId": 10,
"applicationUserId": "7f0d43b8-e1a2-4c12-859c-9ed7f6e2d71c",
"applicationUserName": "Stephen",
"applicationEventName": "Catalogue User Created",
"applicationName": "ea-catalogue",
"dateCreated": "2020-03-16T12:02:30.777397",
"isComplete": false