"use client"

import { cn } from "@/lib/utils"

interface Column<T> {
  key: keyof T | string
  header: string
  className?: string
  render?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  emptyMessage?: string
  className?: string
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onRowClick,
  emptyMessage = "Tidak ada data",
  className
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-gray-200 bg-white", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "border-b border-gray-100 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-gray-50"
                )}
              >
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={cn(
                      "px-4 py-3 text-sm text-gray-600",
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(item)
                      : String((item as Record<string, unknown>)[column.key as string] ?? '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
