export class Application {
    applicationId: number;
    dateCreated: string;
    name: string;
    clientId: string;
    isRegistered: boolean;
}

export interface CreateAuditApplicationCommand {
  name: string;
  description: string;
  clientId: string;
}

