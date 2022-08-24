import { PropsWithChildren } from "react";
import Link from "next/link";
import { useAuth } from "../../providers/AuthProvider";

export function Header(props: PropsWithChildren) {
  const { user, signOut } = useAuth();

  return (
    <nav className={"bg-primary-200 w-full border-t-4 border-primary-500"}>
      <div className={"container-lg flex justify-between items-center"}>
        <span className="font-title text-2xl tracking-tighter text-primary-900">
          Dungeon Manager
        </span>
        <div className={"flex"}>
          <Link href={"/images"}>
            <a className={"nav-link"}>Images</a>
          </Link>
          {/* <Link href={"/music"}>
            <a className={"nav-link"}>Music</a>
          </Link> */}
          {user && (
            <button className={"nav-link"} onClick={() => signOut()}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
