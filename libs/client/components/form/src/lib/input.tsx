import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '@auction-nx/client/utils';

interface Props<T, K> extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  touched?: T;
  errors?: K;
}

function Input<T, K>({
  label,
  className = '',
  touched,
  errors,
  key,
  ...rest
}: Props<T, K>) {
  return (
    <div className={classNames(className, 'mt-4')}>
      {label && (
        <label
          htmlFor={label}
          className="mb-1 inline-block w-full text-left text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        className=" form-control sm:text-md focus:border-primary m-0 block w-full resize-none rounded-xl border-2 border-solid border-gray-500  px-3 py-2.5 text-base font-normal text-gray-900 transition duration-300 ease-in-out focus:text-gray-700 focus:placeholder-gray-500 "
        id={label}
        {...rest}
      />
      {touched && errors && (
        <span className=" w-full pl-2 text-left text-red-500">
          {errors as string}
        </span>
      )}
    </div>
  );
}

export default Input;
