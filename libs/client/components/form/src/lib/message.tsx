import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { classNames } from '@auction-nx/client/utils';

interface MessageProps {
  type: 'error' | 'success';
  text: string;
}

export default function Message({ text, type }: MessageProps) {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={classNames(
        'flex items-center justify-between  rounded-xl',
        type === 'error' ? 'bg-red-400' : 'bg-green-500',
        open ? 'block' : 'hidden'
      )}
    >
      <div
        className={classNames(
          'flex items-center gap-2 space-x-2 p-4 text-center text-sm text-white'
        )}
      >
        {type === 'error' && <ExclamationCircleIcon className="h-6 w-6" />}
        {type == 'success' && <CheckCircleIcon className="h-6 w-6" />}
        <span>{text}</span>
      </div>
      <XMarkIcon
        className="mx-2 h-6 w-6 stroke-white"
        type="button"
        onClick={() => setOpen(false)}
      />
    </div>
  );
}
