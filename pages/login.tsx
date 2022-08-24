import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { useAuth } from "../providers/AuthProvider";

const Login: NextPage = (props) => {
  const { signInWithGoogle, user } = useAuth();
  const { query, push } = useRouter();
  const continuePath = Array.isArray(query.pathname)
    ? query.pathname[0]
    : query.pathname;

  useEffect(() => {
    if (user) {
      push(continuePath || "/");
    }
  }, [user, continuePath, push]);

  return (
    <PageLayout>
      <div className={"flex h-full items-center justify-center"}>
        <div className={"card p-4 flex flex-col items-center"}>
          <h1 className={"font-title text-lg"}>Dungeon Manager</h1>
          <button
            className={"mt-4 btn btn-primary"}
            onClick={() => signInWithGoogle()}
          >
            Login With Google
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
