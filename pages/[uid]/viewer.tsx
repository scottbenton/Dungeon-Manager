import { NextPage } from "next";
import { useRouter } from "next/router";
import { PageLayout } from "../../components/layout/PageLayout";
import { useImages } from "../../connectors/useImages";

const Viewer: NextPage = (props) => {
  const { query } = useRouter();
  const uid = Array.isArray(query.uid) ? query.uid[0] : query.uid;

  const { imageUrls, selectedImageId, allImages } = useImages(uid || "");
  const selectedURL = imageUrls[selectedImageId || ""];

  return (
    <PageLayout fullScreen>
      <div
        className={
          "bg-gray-900 flex-grow flex items-stretch justify-center min-h-100"
        }
      >
        <div
          style={{ backgroundImage: `url(${selectedURL})` }}
          className={"flex-grow bg-contain bg-center bg-no-repeat"}
        >
          Test
        </div>
        <div
          className={"absolute bottom-0 right-0 left-0 bg-smoke-dark px-8 py-4"}
        >
          <h1 className={"text-xl text-white font-semibold"}>
            {selectedURL && selectedImageId && allImages[selectedImageId]
              ? allImages[selectedImageId].displayName
              : "Waiting for the user to selet an image..."}
          </h1>
        </div>
      </div>
    </PageLayout>
  );
};

export default Viewer;
