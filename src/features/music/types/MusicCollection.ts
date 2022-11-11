import { MusicDocument } from './MusicDocument';

export interface MusicCollection {
  [id: string]: MusicDocument;
}
