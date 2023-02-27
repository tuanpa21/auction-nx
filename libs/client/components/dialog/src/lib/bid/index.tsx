import { IProps } from '../interface';
import useBidData from './data';
import BidView from './view';

export default function BidItem({ open, setOpen }: IProps) {
  const { touched, values, errors, handleChange, handleSubmit, isLoading } =
    useBidData(open, setOpen);

  return (
    <BidView
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
