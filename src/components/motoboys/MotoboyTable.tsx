
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Motoboy } from "@/types";
import { 
  Download, 
  MoreHorizontal, 
  Pencil, 
  Plus, 
  Search, 
  Trash2, 
  FileText
} from "lucide-react";

interface MotoboyTableProps {
  motoboys: Motoboy[];
}

export const MotoboyTable = ({ motoboys }: MotoboyTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // In a real implementation, this would fetch the user data for each motoboy
  // For now, we'll mock it with placeholders
  const getMockMotoboysWithUserInfo = (motoboys: Motoboy[]) => {
    return motoboys.map(motoboy => ({
      ...motoboy,
      name: `Motoboy ${motoboy.id}`,
      phone: `(11) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`
    }));
  };
  
  const motoboysWithUserInfo = getMockMotoboysWithUserInfo(motoboys);
  
  const filteredMotoboys = searchQuery
    ? motoboysWithUserInfo.filter(
        (motoboy) =>
          motoboy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          motoboy.license_number.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : motoboysWithUserInfo;
    
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar motoboys..."
            className="pl-8 w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="bg-coopewise-600 hover:bg-coopewise-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Motoboy
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Nome</TableHead>
              <TableHead>CNH</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMotoboys.length > 0 ? (
              filteredMotoboys.map((motoboy) => (
                <TableRow key={motoboy.id}>
                  <TableCell>
                    <div className="font-medium">{motoboy.name}</div>
                  </TableCell>
                  <TableCell>{motoboy.license_number}</TableCell>
                  <TableCell>{motoboy.phone}</TableCell>
                  <TableCell>{motoboy.vehicle_type}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={motoboy.available ? "default" : "outline"}
                      className={motoboy.available ? "bg-green-500" : ""}
                    >
                      {motoboy.available ? "Disponível" : "Indisponível"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-1">{motoboy.rating.toFixed(1)}</span>
                      <div className="text-amber-500">★</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Documentos
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Nenhum motoboy encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
