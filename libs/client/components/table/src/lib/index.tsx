import { Button } from '@auction-nx/client/components/button';
import { useBid, Filter } from '@auction-nx/client/components/dialog';
import { flexRender } from '@tanstack/react-table';
import { useEffect } from 'react';

export default function AppTable({ filter }: { filter: Filter }) {
  const { data, table, isLoading, isError, isSuccess, refetch, setFilters } =
    useBid();
  useEffect(() => {
    if (filter) {
      setFilters(filter);
    }
  }, [filter, setFilters]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center h-full w-screen">
          <p>Loading...</p>
        </div>
      )}

      {isError && (
        <div className="flex min-h-[500px] flex-col items-center justify-center rounded-xl bg-white py-12  md:min-h-[600px]">
          <p className="text-xl font-semibold text-gray-700">
            Failed to fetch table information...
          </p>

          <Button className="mt-2" onClick={refetch} isLoading={isLoading}>
            Retry
          </Button>
        </div>
      )}

      {isSuccess && data && data.length <= 0 && (
        <div className="flex min-h-[500px] flex-col items-center justify-center rounded-xl bg-white py-12  md:min-h-[600px]">
          <p className="text-xl font-semibold text-gray-700">No content</p>
        </div>
      )}

      {isSuccess && data && data.length > 0 && (
        <div className="h-full w-full overflow-auto rounded-xl bg-theadbg  px-36 py-1">
          <table className="w-full border-separate border-spacing-y-2 rounded-xl">
            <thead className="text-left ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="text-gray-600">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 text-sm font-semibold tracking-wide text-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="text-left">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={'overflow-hidden text-gray-800'}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className=" text-center whitespace-nowrap bg-white px-3 py-6 text-sm first:rounded-tl-xl first:rounded-bl-xl last:rounded-tr-xl last:rounded-br-xl"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
