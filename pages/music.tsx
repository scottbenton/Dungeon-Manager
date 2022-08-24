import { NextPage } from "next";
import { PageLayout } from "../components/layout/PageLayout";

const MusicPage: NextPage = (props) => {
  return <PageLayout authRequired>Music</PageLayout>;
};

export default MusicPage;
