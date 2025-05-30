import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <section className="grid grid-cols-1">
        <p className="text-2xl font-bold mb-4" >Início</p>
        <Card>
          <CardHeader>
            <div className="flex">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Trabalho de Sistemas Distribuídos
              </CardTitle>
            </div>
            <CardDescription>
              Confecção de um serviço web e cliente para demonstração dos princípios REST
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base">Universidade Federal Fluminense - IC</p>
            <p className="text-base">Aluno: Thiago do Prado Silva</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}