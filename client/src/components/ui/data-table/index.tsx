"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { schemaMap } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
interface Props<T> {
  data: T[];
  keys: string[];
  schemaType: string;
}

function generateColumns<Type>({ keys, form }: { keys: string[], form: typeof useForm }): ColumnDef<Type>[] {
  const keysCopy = [...keys];
  const keysToUpdate = keysCopy.filter((key) => key !== "id" && key !== "createdAt" && key !== "updatedAt");
  const firstKey = keysCopy.shift() ?? "";
  const secondKey = keysCopy.shift() ?? "";

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: firstKey,
      header: firstKey.charAt(0).toUpperCase() + firstKey?.slice(1),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue(firstKey)}</div>
      ),
    },
    {
      accessorKey: secondKey,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {secondKey.charAt(0).toUpperCase() + secondKey?.slice(1)}
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue(secondKey)}</div>,
    },
    ...keysCopy.map((key) => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key?.slice(1),
      cell: ({ row }: { row: any }) => (
        <div className="capitalize">{row.getValue(key)}</div>
      ),
    })),
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                  <DialogTrigger asChild>
                    <DropdownMenuItem>Update</DropdownMenuItem>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Update</DialogTitle>
                      <DialogDescription>Update yor entity</DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                      <form 
                        onSubmit={form.handleSubmit((data) => {
                          const original = row.original as { _links?: { href: string, rel: string, type: string }[] }
                          const updateLink = (original._links ?? []).find((link) => link.rel === 'update')
                          
                          if (updateLink) {
                            const { href, type } = updateLink
                            fetch(href, {
                              method: type,
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(data),
                            })
                          }
                        })}
                        className="w-2/3 space-y-6"
                      >
                        <div className="grid gap-4">
                          {keysToUpdate.map((key) => (
                            <FormField
                              key={key}
                              control={form.control}
                              name={key}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                                  <FormControl>
                                    <Input placeholder={(row.original as any)[key]} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit" value="submit">Save changes</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>

                <DropdownMenuItem
                  onClick={() => {
                    const original = row.original as { _links?: { href: string, rel: string, type: string }[] }
                    const deleteLink = (original._links ?? []).find((link) => link.rel === 'delete')
                    
                    if (deleteLink) {
                      const { href, type } = deleteLink
                      fetch(href, {
                        method: type,
                      })
                    }
                  }}
                  className="text-red-500"
                >Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
        )
      },
    },
  ]
}

export default function DataTable<Type>(props: Readonly<Props<Type>>) {
  const { data, keys, schemaType } = props;

  const schema = schemaMap[schemaType] ?? z.object({}); // Fallback to an empty schema if not found
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  })

  const columns = generateColumns({ keys, form });
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}