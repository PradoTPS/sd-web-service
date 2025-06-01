import DataTable from "@/components/ui/data-table";
import InputForm from "@/components/ui/input-form";

async function fetchData(): Promise<List[]> {
  const response = await fetch("http://localhost:8000/lists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch board games");
  }

  const data = await response.json();

  const parsedData = data.body.lists.map((list: any) => ({
    ...list,
    boardGames: list.boardGames.map((bg: any) => bg.id),
  }));

  return parsedData as List[];
}

type List = {
  id: string
  name: string
  playerId: string
  createdAt: string
  updatedAt: string
  boardGames: string[]
  _links: Array<{
    href: string
    rel: string
    type: string
  }>
}

export default async function Page() {
  const data = await fetchData();
  const keys = ["id", "name", "playerId", "createdAt", "updatedAt", "boardGames"];

  return (
    <section className="grid grid-cols-1">
      <p className="text-2xl font-bold mb-4">Lists</p>
      <DataTable<List>
        data={data}
        keys={keys}
        schemaType={"list"}
      />
      <InputForm
        schemaType={"list"}
        title={"New - List"}
        description={"Cadastrar uma nova list"}
        url={"http://localhost:8000/players/{playerId}/lists"}
        method={"POST"}
      />
    </section>
  );
}