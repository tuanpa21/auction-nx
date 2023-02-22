import useDepositData from './data';
import { IProps } from '../interface';
import DepositDialog from './view';

export default function DepositView({ open, setOpen }: IProps) {
  const { touched, values, errors, handleChange, handleSubmit, isLoading } =
    useDepositData(setOpen);

  return (
    <DepositDialog
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
