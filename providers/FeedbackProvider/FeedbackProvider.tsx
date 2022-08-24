import { PropsWithChildren, useCallback, useState } from "react";
import { FeedbackContext } from "./FeedbackContext";

export function FeedbackProvider(props: PropsWithChildren) {
  const { children } = props;

  const [loadingKeys, setLoadingKeys] = useState<{ [key: string]: boolean }>(
    {}
  );
  const isLoading = Object.keys(loadingKeys).length > 0;

  const updateLoadingKey = useCallback((key: string, value: boolean) => {
    setLoadingKeys((prevKeys) => {
      let newKeys = { ...prevKeys };
      if (value) {
        newKeys[key] = true;
      } else {
        delete newKeys[key];
      }
      return newKeys;
    });
  }, []);

  return (
    <FeedbackContext.Provider value={{ isLoading, updateLoadingKey }}>
      {children}
    </FeedbackContext.Provider>
  );
}
