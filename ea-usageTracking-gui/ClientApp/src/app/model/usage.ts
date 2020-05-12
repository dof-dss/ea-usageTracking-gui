import { Guid } from 'guid-typescript';

export interface Usage {
    id: number;
    applicationId: number;
    applicationEventId: number;
    applicationUserId: Guid;
    applicationUserName: string;
    applicationUserEmail: string;
    applicationEventName: string;
    applicationName: string;
    dateCreated: string;
    isComplete: boolean;
}
