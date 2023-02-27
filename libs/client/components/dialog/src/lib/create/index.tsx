import { useCreateData } from './data';
import { IProps } from '../interface';
import CreateItemDialogView from './view';

export default function CreateItem({ open, setOpen }: IProps) {
  const {
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
    isLoading,
    setFieldValue,
  } = useCreateData(setOpen);

  return (
    <CreateItemDialogView
      open={open}
      setOpen={setOpen}
      touched={touched}
      values={values}
      errors={errors}
      setFieldValue={setFieldValue}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
