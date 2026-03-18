import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { useTable } from "@refinedev/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

type ClassRow = {
  id: number;
  name: string;
  courseCode?: string;
  status?: string;
  subject?: {
    name?: string;
  };
  teacher?: {
    name?: string;
  };
};

function ClassesList() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchFilter = searchQuery
    ? [
        {
          field: "name",
          operator: "contains" as const,
          value: searchQuery,
        },
      ]
    : [];

  const classesTable = useTable<ClassRow>({
    columns: useMemo<ColumnDef<ClassRow>[]>(
      () => [
        {
          id: "name",
          accessorKey: "name",
          size: 220,
          header: () => <p className="column-title">Class</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>()}</span>
          ),
        },
        {
          id: "courseCode",
          accessorKey: "courseCode",
          size: 130,
          header: () => <p className="column-title">Code</p>,
          cell: ({ getValue }) => <Badge>{getValue<string>() ?? "-"}</Badge>,
        },
        {
          id: "subject",
          accessorKey: "subject.name",
          size: 180,
          header: () => <p className="column-title">Subject</p>,
          cell: ({ getValue }) => (
            <Badge variant="secondary">{getValue<string>() ?? "-"}</Badge>
          ),
        },
        {
          id: "teacher",
          accessorKey: "teacher.name",
          size: 180,
          header: () => <p className="column-title">Teacher</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>() ?? "-"}</span>
          ),
        },
        {
          id: "status",
          accessorKey: "status",
          size: 120,
          header: () => <p className="column-title">Status</p>,
          cell: ({ getValue }) => (
            <Badge variant="outline">{getValue<string>() ?? "-"}</Badge>
          ),
        },
      ],
      []
    ),
    refineCoreProps: {
      resource: "classes",
      pagination: {
        pageSize: 10,
        mode: "server",
      },
      filters: {
        permanent: [...searchFilter],
      },
      sorters: {
        initial: [
          {
            field: "id",
            order: "desc",
          },
        ],
      },
    },
  });

  useEffect(() => {
    classesTable.refineCore.setCurrentPage(1);
  }, [searchQuery, classesTable.refineCore]);

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Classes</h1>
      <div className="intro-row">
        <p>Browse and manage all classes in one place</p>
        <br />
        <div className="actions-row">
          <div className="relative w-full md:max-w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
            <Input
              placeholder="Search by class name..."
              type="text"
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <br />
          <div className="flex gap-2 w-full sm:w-auto">
            <CreateButton />
          </div>
        </div>
      </div>
      <DataTable table={classesTable} />
    </ListView>
  );
}

export default ClassesList;
