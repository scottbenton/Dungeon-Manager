import type { NextPage } from "next";
import { PageLayout } from "../components/layout/PageLayout";

export async function getServerSideProps(context: any) {
  return {
    redirect: {
      destination: "/images",
      permanent: false,
    },
  };

  return {
    props: {}, // will be passed to the page component as props
  };
}

const Home: NextPage = () => {
  return <PageLayout>Home</PageLayout>;
};

export default Home;
