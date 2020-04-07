export class Application {
    id: number;
    dateCreated: string;
    name: string;
    clientId: string;
}

export interface CreateAuditApplicationCommand {
  name: string;
  description: string;
  clientId: string;
}

