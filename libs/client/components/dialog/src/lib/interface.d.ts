export interface IProps {
  open: { open: boolean; id: string };
  setOpen: (value: { open: boolean; id: string }) => void;
}
