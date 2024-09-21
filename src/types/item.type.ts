export interface ItemType {
  name: string;
  imageFilename: string | null;
  customFieldValues: Record<string, string>;
}

export enum ItemTypes {
  Locations = 'locations',
  NPCs = 'npcs',
  Lore = 'lore',
}
