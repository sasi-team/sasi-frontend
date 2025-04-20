import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function EstabelecimentosPage() {
  return (
    <div className="space-y-8">
      <h1 className="section-title">Gerenciamento de Estabelecimentos</h1>

      {/* TODO: Adicionar botões (ex: Novo Estabelecimento), filtros, busca */}

      <Table>
        <TableCaption>Lista dos estabelecimentos cadastrados.</TableCaption>
        <TableHeader>
          <TableRow><TableHead className="w-[100px]">Código</TableHead><TableHead>Nome</TableHead><TableHead>Município</TableHead><TableHead className="text-right">Status</TableHead><TableHead className="text-right">Ações</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          {/* TODO: Popular com dados reais */}
          <TableRow><TableCell className="font-medium">EST001</TableCell><TableCell>Hospital Central</TableCell><TableCell>Cidade Exemplo</TableCell><TableCell className="text-right">Ativo</TableCell><TableCell className="text-right">...</TableCell></TableRow>
          <TableRow><TableCell className="font-medium">EST002</TableCell><TableCell>Clínica Sul</TableCell><TableCell>Outra Cidade</TableCell><TableCell className="text-right">Inativo</TableCell><TableCell className="text-right">...</TableCell></TableRow>
        </TableBody>
      </Table>

       {/* TODO: Adicionar mapa se necessário, baseado em estabelecimentos-page.png */}
    </div>
  );
} 