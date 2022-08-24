import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Header } from "./Header";

interface PageLayoutProps extends PropsWithChildren {
  fullScreen?: boolean;
  authRequired?: boolean;
}

export function PageLayout(props: PageLayoutProps) {
  const { fullScreen, authRequired, children } = props;
  const { user, isLoading } = useAuth();
  const { push } = useRouter();

  const needsAuth = authRequired && !isLoading && !user;
  const canShowPage = authRequired ? user && !isLoading : true;

  useEffect(() => {
    if (needsAuth) {
      console.debug(window.location);
      push(`/login?pathname=${window.location.pathname}`);
    }
  }, [needsAuth, push]);

  return (
    <div className={"flex flex-col w-full min-h-screen"}>
      {!fullScreen && <Header />}
      <div
        className={
          "flex-grow flex flex-col" + (fullScreen ? "" : " container-lg py-4")
        }
      >
        {canShowPage && children}
      </div>
    </div>
  );
}
