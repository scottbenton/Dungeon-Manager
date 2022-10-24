export interface AuthState {
  user?: {
    displayName?: string;
    id: string;
  };
  isLoading: boolean;
  error?: string;
}
