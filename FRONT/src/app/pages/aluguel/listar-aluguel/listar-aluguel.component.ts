import { Quarto } from './../../../models/quarto.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluguel } from 'src/app/models/aluguel.models';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.models';

@Component({
  selector: 'app-listar-aluguel',
  templateUrl: './listar-aluguel.component.html',
  styleUrls: ['./listar-aluguel.component.css']
})
export class ListarAluguelComponent implements OnInit {
  quarto?: Quarto;
  cliente?: Cliente;
  nome?: string;
  tipoQuarto?: string;
  qaurtoId?: number;
  alugueis?: Aluguel[];
  novoQuartoId?: number;

  constructor(private client: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.client.get<Aluguel[]>('https://localhost:7087/api/aluguel/listar').subscribe({
      next: (aluguel) => {
        this.alugueis = aluguel;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  checkout(id: number): void {
    this.client.delete(`https://localhost:7087/api/aluguel/checkout/${id}`).subscribe({
      next: () => {
        this.router.navigate(['pages/aluguel/listar']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  trocarQuarto(id: number): void {
    const aluguelModificado = { quartoId: this.novoQuartoId };
    this.client.put(`https://localhost:7087/api/aluguel/trocarquarto/${id}`, aluguelModificado).subscribe({
      next: () => {
        this.router.navigate(['pages/aluguel/listar']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}



