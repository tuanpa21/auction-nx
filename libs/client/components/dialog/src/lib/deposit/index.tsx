import useDepositData from './data';
import { IProps } from '../interface';
import DepositDialogView from './view';

export default function DepositDialog({ open, setOpen }: IProps) {
  const { touched, values, errors, handleChange, handleSubmit, isLoading } =
    useDepositData(setOpen);

  return (
    <DepositDialogView
      open={open}
      setOpen={setOpen}
      touched={touched}
      values={values}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
