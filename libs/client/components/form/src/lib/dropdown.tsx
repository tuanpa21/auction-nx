import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '@auction-nx/client/utils';

interface Props<T, K> extends ComponentPropsWithoutRef<'select'> {
  label?: string;
  children: ReactNode;
  touched?: T;
  errors?: K;
}

function DropDown<T, K>({
  label,
  className = '',
  children,
  touched,
  errors,
  ...rest
}: Props<T, K>) {
  console.log('DropDown', {
    label,
    className,
    children,
    touched,
    errors,
    ...rest,
  });
  return (
    <div className={classNames(className, 'mb-5')}>
      {label && (
        <label
          htmlFor={label}
          className="form-label mb-2 inline-block text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        className="form-control sm:text-md focus:border-primary m-0 block w-full resize-none rounded-lg border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2.5 text-base font-normal text-gray-900 shadow-sm transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:placeholder-gray-500 focus:outline-none"
        id={label}
        {...rest}
      >
        {children}
      </select>
      {touched && errors && (
        <span className=" w-full pl-2 text-left text-red-500">
          {errors as string}
        </span>
      )}
    </div>
  );
}

export default DropDown;
