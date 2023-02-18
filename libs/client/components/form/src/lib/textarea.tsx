import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '@auction-nx/client/utils';

interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  label?: string;
}

function TextArea({
  label,
  maxLength = 160,
  className = '',
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className="form-label mb-2 inline-block text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        className={classNames(
          'form-control sm:text-md focus:border-primary m-0 block w-full resize-none rounded-lg border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2.5 text-base font-normal text-gray-900  shadow-sm transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:placeholder-gray-500 focus:outline-none',
          className
        )}
        id={label}
        maxLength={maxLength}
        rows={3}
        {...rest}
      ></textarea>
    </div>
  );
}

export default TextArea;
