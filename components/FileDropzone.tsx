import { PropsWithChildren } from "react";
import clsx from "clsx";

export interface FileDropzoneProps extends PropsWithChildren {
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
  className?: string;
}

export function FileDropzone(props: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive, className } = props;

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "px-4 py-12 flex items-center justify-center rounded-sm border-2 border-dashed cursor-pointer",
        isDragActive
          ? "border-primary-500 bg-primary-200"
          : "border-gray-400 bg-gray-200",
        className
      )}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className={"text-primary-800"}>Drop the files here.</p>
      ) : (
        <p className={"text-gray-800"}>
          Click here, or drag and drop files here to upload them
        </p>
      )}
    </div>
  );
}
