export class Application {
    applicationId: number;
    dateCreated: string;
    name: string;
    clientId: string;
    isRegistered: boolean;
}

export class RegisterCommand {
  applicationId: number;
  identityToken: string;
}

