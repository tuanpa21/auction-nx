import CircularProgress from '../icon/circular-progress';

export type NativeButtonProps = React.ComponentPropsWithoutRef<'button'>;

export interface ButtonProps extends NativeButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export default function Button({
  children,
  className,
  type,
  loadingText = 'Processing...',
  isLoading,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={`mt-8 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-12 py-[0.50rem] text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`}
      type={type ?? 'button'}
      {...otherProps}
    >
      {isLoading && (
        <>
          <CircularProgress />
          {loadingText}
        </>
      )}
      {!isLoading && children}
    </button>
  );
}
