export interface IProps {
  open: { open: boolean; id: string, type: string };
  setOpen: (value: { open: boolean; id: string, type: string }) => void;
}
