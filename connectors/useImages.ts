import {
  DocumentReference,
  onSnapshot,
  Unsubscribe,
  updateDoc,
  setDoc,
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { firestore, storage } from "../firebase/firebase";
import { doc } from "firebase/firestore";

export interface ImageCollectionData {
  [key: string]: IDndImage;
}
export interface BaseCollectionData {
  selectedImage?: string;
}

export interface IDndImage {
  filename: string;
  displayName: string;
}

const IMAGES_COLLECTION_NAME = "images";

export function useImages(uid: string) {
  const [selectedImageId, setSelectedImageId] = useState<string>();
  const [allImages, setAllImages] = useState<ImageCollectionData>({});
  const [imageUrls, setImageUrls] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    let unsub: Unsubscribe;
    let unsubBase: Unsubscribe;
    if (uid) {
      unsubBase = onSnapshot<BaseCollectionData>(getFirestoreBaseRef(), {
        next: (snapshot) => {
          const data = snapshot.data();
          setSelectedImageId(data?.selectedImage);
        },
      });
      unsub = onSnapshot<IDndImage>(getFirestoreCollectionRef(), {
        next: (snapshot) => {
          let images: ImageCollectionData = {};

          snapshot.docs.forEach((doc) => {
            const image = doc.data();
            images[doc.id] = image;

            if (!imageUrls[image.filename]) {
              getDownloadURL(getStorageRef(image.filename)).then((url) =>
                setImageUrls((prevUrls) => {
                  let newUrls = { ...prevUrls };
                  newUrls[doc.id] = url;
                  return newUrls;
                })
              );
            }
          });
          setAllImages(images);
        },
      });
    }
    return () => {
      unsub && unsub();
      unsubBase && unsubBase();
    };
  }, [uid]);

  const getFirestoreBaseRef = () => {
    return doc(
      firestore,
      IMAGES_COLLECTION_NAME,
      uid
    ) as DocumentReference<BaseCollectionData>;
  };
  const getFirestoreDocRef = (docId: string) => {
    return doc(
      firestore,
      IMAGES_COLLECTION_NAME,
      uid,
      IMAGES_COLLECTION_NAME,
      docId
    ) as DocumentReference<IDndImage>;
  };
  const getFirestoreCollectionRef = () => {
    return collection(
      firestore,
      IMAGES_COLLECTION_NAME,
      uid,
      IMAGES_COLLECTION_NAME
    ) as CollectionReference<IDndImage>;
  };

  const getStorageRef = (filename: string) => {
    return ref(storage, `${IMAGES_COLLECTION_NAME}/${uid}/${filename}`);
  };

  const upload = (file: File) => {
    // 'file' comes from the Blob or File API
    uploadBytes(getStorageRef(file.name), file).then((snapshot) => {
      const newImage: IDndImage = {
        filename: snapshot.ref.name,
        displayName: getFriendlyFilename(file.name),
      };
      addDoc<IDndImage>(getFirestoreCollectionRef(), newImage);
    });
  };

  const deleteImage = (id: string, filename: string) => {
    deleteDoc(getFirestoreDocRef(id)).then(() => {
      deleteObject(getStorageRef(filename));
    });
  };

  const select = (id: string) => {
    setDoc(
      getFirestoreBaseRef(),
      {
        selectedImage: id,
      },
      { merge: true }
    );
  };

  const updateDisplayName = (id: string, newName: string) => {
    updateDoc(getFirestoreDocRef(id), {
      displayName: newName,
    });
  };

  const getFriendlyFilename = (filename: string) => {
    const lastIdx = filename.lastIndexOf(".");

    return lastIdx > 0 ? filename.substring(0, lastIdx) : filename;
  };

  return {
    selectedImageId,
    allImages,
    imageUrls,
    upload,
    select,
    deleteImage,
    updateDisplayName,
  };
}
