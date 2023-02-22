import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '@auction-nx/client/utils';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useFormData from './data';

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
  const { setShowPassword, showPassword } = useFormData();

  return (
    <div className={classNames(className, 'mt-4', 'relative')}>
      {label && (
        <label
          htmlFor={rest.id}
          className="mb-1 inline-block w-full text-left text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        className=" form-control sm:text-md focus:border-primary m-0 block w-full resize-none rounded-xl border-2 border-solid border-gray-500  px-3 py-2.5 text-base font-normal text-gray-900 transition duration-300 ease-in-out focus:text-gray-700 focus:placeholder-gray-500 "
        id={rest.id}
        {...rest}
      />
      {!showPassword && rest.id === 'password' && (
        <EyeIcon
          width={15}
          height={15}
          className="absolute top-11 right-5"
          type="button"
          onClick={() => {
            if (rest.id)
              (document?.getElementById(rest.id) as HTMLInputElement).type =
                'text';
            setShowPassword(true);
          }}
        />
      )}
      {showPassword && rest.id === 'password' && (
        <EyeSlashIcon
          width={15}
          height={15}
          className="absolute top-11 right-5"
          type="button"
          onClick={() => {
            if (rest.id)
              (document?.getElementById(rest.id) as HTMLInputElement).type =
                'password';
            setShowPassword(false);
          }}
        />
      )}
      {touched && errors && (
        <span className=" w-full pl-2 text-left text-red-500">
          {errors as string}
        </span>
      )}
    </div>
  );
}

export default Input;
