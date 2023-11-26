import { Quarto } from './quarto.model';
import { Cliente } from "./cliente.models";
export interface Aluguel{
    cliente?: Cliente;
    quarto?: Quarto;
    aluguelId?: number;
    clienteId?: number;
    quartoId?: number;
    dias: number;
    valorTotal: number;
}