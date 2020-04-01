export interface Applications {
    data : Application[],
    pageNumber: number,
    pageSize: number,
    nextPage: string,
    previousPage: string
  }

export interface Application {
    id: number;
    dateCreated: string;
    name: string;
    description: string;
    clientId: string;
}

export interface CreateAuditApplicationCommand {
  name: string;
  description: string;
  clientId: string;
}

