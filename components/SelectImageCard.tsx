import { PropsWithChildren, useState } from "react";
import clsx from "clsx";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import { IconButton } from "./IconButton";
import EditIcon from "@heroicons/react/20/solid/PencilIcon";
import DeleteIcon from "@heroicons/react/20/solid/TrashIcon";
import SaveIcon from "@heroicons/react/20/solid/CheckIcon";
import CancelIcon from "@heroicons/react/20/solid/XMarkIcon";
import { TextInput } from "./TextInput";

export interface SelectImageCardProps extends PropsWithChildren {
  imageUrl: string;
  displayName: string;
  selectImage: () => void;
  deleteImage: () => void;
  updateImage: (newDisplayName: string) => void;
  isSelected: boolean;
}

export function SelectImageCard(props: SelectImageCardProps) {
  const {
    imageUrl,
    displayName,
    selectImage,
    deleteImage,
    updateImage,
    isSelected,
  } = props;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(displayName);

  const handleEditSave = () => {
    updateImage(newName);
    setIsEditing(false);
  };

  return (
    <button
      className={clsx(
        "rounded-sm hover:shadow-md focus:ring-4 focus:outline-none cursor-pointer block w-full h-full transition-shadow duration-300 ease-in-out",
        isSelected
          ? "border-2 border-primary-400 ring-primary-200"
          : "border ring-gray-200"
      )}
      onClick={() => selectImage()}
    >
      <div
        className={clsx("aspect-video bg-cover relative", isSelected ? "" : "")}
        style={{
          backgroundImage: isSelected
            ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imageUrl})`
            : `url(${imageUrl})`,
        }}
      >
        {isSelected && (
          <CheckCircleIcon className={"h-6 text-white m-2 float-right"} />
        )}
        <div
          className={
            "absolute z-10 right-4 bottom-0 transform translate-y-1/2 space-x-2"
          }
        >
          {isEditing ? (
            <>
              <IconButton
                className={"bg-green-500 hover:bg-green-600 ring-green-300"}
                label={"Edit Card"}
                onClick={() => handleEditSave()}
                Icon={SaveIcon}
              />
              <IconButton
                className={"bg-red-500 hover:bg-red-600 ring-red-300"}
                label={"Delete Card"}
                onClick={() => setIsEditing(false)}
                Icon={CancelIcon}
              />
            </>
          ) : (
            <>
              <IconButton
                className={"bg-blue-500 hover:bg-blue-600 ring-blue-300"}
                label={"Edit Card"}
                onClick={() => setIsEditing(true)}
                Icon={EditIcon}
              />
              <IconButton
                className={"bg-red-500 hover:bg-red-600 ring-red-300"}
                label={"Delete Card"}
                onClick={() => deleteImage()}
                Icon={DeleteIcon}
              />
            </>
          )}
        </div>
      </div>
      <div className={"p-2 mt-2 text-left"}>
        {isEditing ? (
          <TextInput
            value={newName}
            onChange={setNewName}
            label={"New Image Name"}
            hideLabel
            id={"new-image-name-input"}
          />
        ) : (
          <p
            className={clsx(
              "font-semibold, text-lg truncate",
              isSelected ? "text-primary-600" : "text-gray-600"
            )}
          >
            {displayName}
          </p>
        )}
      </div>
    </button>
  );
}
