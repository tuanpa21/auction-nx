import { IProps } from '../interface';
import useBidData from './data';
import BidItem from './view';

export default function BidView({ open, setOpen }: IProps) {
  const { touched, values, errors, handleChange, handleSubmit, isLoading } =
    useBidData(setOpen);

  return (
    <BidItem
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
