import { createContext } from "react";

export interface IFeedbackContext {
  isLoading: boolean;
  updateLoadingKey: (key: string, value: boolean) => void;
}

export const FeedbackContext = createContext<IFeedbackContext>({
  isLoading: false,
  updateLoadingKey: () => {},
});
