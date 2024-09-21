import { onSnapshot, Unsubscribe } from 'firebase/firestore';
import { itemCollectionRef } from './_getRef';
import { ItemType, ItemTypes } from '@/types/item.type';

export function loadItems(
  campaignId: string,
  setLoaded: (itemType: ItemTypes) => void,
  setItem: (itemType: ItemTypes, itemId: string, item: ItemType) => void,
  removeItem: (itemType: ItemTypes, itemId: string) => void,
  onError: (itemType: ItemTypes, error: string) => void,
): () => void {
  let unsubscribes: Unsubscribe[] = [];
  for (const itemType of Object.values(ItemTypes)) {
    unsubscribes.push(
      onSnapshot(itemCollectionRef(campaignId, itemType), {
        next: (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'removed') {
              removeItem(itemType, change.doc.id);
            } else {
              setItem(itemType, change.doc.id, change.doc.data() as ItemType);
            }
          });
          if (snapshot.docs.length === 0) {
            setLoaded(itemType);
          }
        },
        error: (error) => {
          onError(itemType, error.message);
        },
      }),
    );
  }

  return () => {
    unsubscribes.forEach((unsubscribe) => {
      unsubscribe();
    });
  };
}
