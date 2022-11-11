import { Dialog } from '@/components/Dialog';
import { AddYoutubePlaylistForm } from './AddYoutubePlaylistForm';

export interface AddMusicDialogProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export function AddMusicDialog(props: AddMusicDialogProps) {
  const { open, setOpen } = props;

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title={'Add Music'}
      content={<AddYoutubePlaylistForm onCompletion={() => setOpen(false)} />}
    />
  );
}
