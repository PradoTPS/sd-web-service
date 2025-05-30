import DataTable from "@/components/ui/data-table";

async function fetchData(): Promise<BoardGame[]> {
  const response = await fetch("http://localhost:8000/boardgames", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch board games");
  }

  const data = await response.json();

  return data.body.boardGames as BoardGame[];
}

type BoardGame = {
  id: string
  name: string
  description: string
  link: string
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
  const keys = ["id", "name", "description", "link", "createdAt", "updatedAt"];

  return (
    <section className="grid grid-cols-1">
        <p className="text-2xl font-bold mb-4" >Board Games</p>
        <DataTable<BoardGame>
          data={data}
          keys={keys}
        />
    </section>
  );
}