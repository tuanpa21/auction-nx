import { useCreateData } from './data';
import { IProps } from '../interface';
import CreateItemDialog from './view';

export default function CreateView({ open, setOpen }: IProps) {
  const { touched, values, errors, handleChange, handleSubmit, isLoading } =
    useCreateData(setOpen);

  return (
    <CreateItemDialog
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
