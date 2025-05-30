import DataTable from "@/components/ui/data-table";
import InputForm from "@/components/ui/input-form";

async function fetchData(): Promise<Player[]> {
  const response = await fetch("http://localhost:8000/players", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch board games");
  }

  const data = await response.json();

  return data.body.players as Player[];
}

type Player = {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  _links: Array<{
    href: string
    rel: string
    type: string
  }>
}

export default async function Page() {
  const data = await fetchData();
  const keys = ["id", "name", "email", "createdAt", "updatedAt"];

  return (
    <section className="grid grid-cols-1">
      <p className="text-2xl font-bold mb-4">Players</p>
      <DataTable<Player>
        data={data}
        keys={keys}
        schemaType={"player"}
      />
      <InputForm
        schemaType={"player"}
        title={"New - Player"}
        description={"Cadastrar um novo player"}
        url={"http://localhost:8000/players"}
        method={"POST"}
      />
    </section>
  );
}