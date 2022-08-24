import { NextPage } from "next";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { FileDropzone } from "../components/FileDropzone";
import { PageLayout } from "../components/layout/PageLayout";
import { SelectImageCard } from "../components/SelectImageCard";
import { useImages } from "../connectors/useImages";
import { useAuth } from "../providers/AuthProvider";

const ImagesPage: NextPage = (props) => {
  const { user } = useAuth();
  const {
    upload,
    imageUrls,
    allImages,
    selectedImageId,
    select,
    deleteImage,
    updateDisplayName,
  } = useImages(user?.uid || "");

  const handleFileUpload = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      upload(file);
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
  });

  return (
    <PageLayout authRequired>
      <div className={"flex justify-between items-baseline"}>
        <h1
          className={
            "text-sm font-semibold tracking-wide text-primary-600 uppercase"
          }
        >
          Image Sharing
        </h1>
        <Link href={`/${user?.uid}/viewer`}>
          <a className={"link"} target={"_blank"}>
            Go to Viewer
          </a>
        </Link>
      </div>
      <p className={"text-gray-700 mt-1"}>
        Upload images to share with your party, then click on the image to set
        it as the visible image for your players.
      </p>

      <FileDropzone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        className={"mt-8"}
      />

      <div
        className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8"}
      >
        {Object.keys(allImages).map((imageKey) => (
          <div key={imageKey}>
            <SelectImageCard
              imageUrl={imageUrls[imageKey]}
              displayName={allImages[imageKey].displayName}
              isSelected={imageKey === selectedImageId}
              selectImage={() => select(imageKey)}
              deleteImage={() =>
                deleteImage(imageKey, allImages[imageKey].filename)
              }
              updateImage={(newName: string) =>
                updateDisplayName(imageKey, newName)
              }
            />
          </div>
        ))}
        {Object.keys(allImages).length === 0 && <span>No Images Found</span>}
      </div>
    </PageLayout>
  );
};

export default ImagesPage;
