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
