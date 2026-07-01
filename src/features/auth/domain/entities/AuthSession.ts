export interface AuthSession {
  accessToken: string;
  tokenType: string;
  user?: {
    id: string;
    name: string;
    role: string;
  };
}