import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { classNames, changeState } from '@auction-nx/client/utils';

import { MenuProps } from './interface';
import {
  CreateDialog,
  DepositDialog,
} from '@auction-nx/client/components/dialog';

export default function MenuPopUp({ items }: MenuProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState({
    id: '',
    open: false,
    type: '',
  });
  const [openState, setOpenState] = useState(false);
  const location = useLocation();

  const toggleMenu = (open: boolean) => {
    // log the current open state in React (toggle open state)
    setOpenState((openState) => !openState);
    // toggle the menu by clicking on buttonRef
    buttonRef?.current?.click(); // eslint-disable-line
  };

  // Open the menu after a delay of timeoutDuration
  const onHover = (open: boolean) => {
    toggleMenu(open);
  };

  const handleClickOutside = (event: any) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      event.stopPropagation();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <>
      <Menu as="div" className="flex px-5 text-left">
        {({ open }) => (
          <div
            className="mt-1"
            onMouseEnter={() => onHover(open)}
            onMouseLeave={() => onHover(open)}
          >
            <Menu.Button
              className={classNames(
                // item.bgColorClass,
                'h-7 w-7 rounded-full'
              )}
              ref={buttonRef}
            >
              <UserCircleIcon width={30} height={30} className="stroke-white" />
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-4 z-10 mx-2 mt-1 w-full max-w-[200px] origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {items &&
                  items.map((item, index) => (
                    <div className="py-1" key={index}>
                      <Menu.Item
                        as={'a'}
                        key={index}
                        className={'cursor-pointer'}
                      >
                        {({ active, close }) => (
                          // eslint-disable-next-line jsx-a11y/anchor-is-valid
                          <a
                            key={index}
                            className={classNames(
                              location.pathname.includes(item.href)
                                ? 'text-black'
                                : '  text-gray-500 hover:text-gray-700',
                              'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                            )}
                            onClick={() => {
                              close();
                              changeState(item.href);
                              setOpen({
                                id: item.id,
                                open: true,
                                type: '',
                              });
                            }}
                            aria-current={
                              location.pathname.includes(item.href)
                                ? 'page'
                                : undefined
                            }
                            title={item.name}
                          >
                            <item.icon
                              className={classNames(
                                location.pathname.includes(item.href)
                                  ? ' text-black'
                                  : 'text-gray-700 group-hover:bg-transparent group-hover:text-gray-700',
                                'mr-3 h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>

      {open.type === 'deposit' && <DepositDialog open={open} setOpen={setOpen} />}
      {open.type === 'create' && <CreateDialog open={open} setOpen={setOpen} />}
    </>
  );
}
