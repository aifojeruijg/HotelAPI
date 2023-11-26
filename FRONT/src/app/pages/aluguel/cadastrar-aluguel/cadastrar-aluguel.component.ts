import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Aluguel } from 'src/app/models/aluguel.models';
import { Cliente } from 'src/app/models/cliente.models';
import { Quarto } from 'src/app/models/quarto.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cadastrar-aluguel',
  templateUrl: './cadastrar-aluguel.component.html',
  styleUrls: ['./cadastrar-aluguel.component.css']
})
export class CadastrarAluguelComponent {
  aluguel?: Aluguel;
  cliente?: Cliente;
  quarto?: Quarto;
  clienteId?: number;
  quartoId?: number;
  status?: string;
  dias?: number;
  valorTotal?: number;
  clientes: Cliente[] = [];
  quartos: Quarto[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    forkJoin({
      quartos: this.client.get<Quarto[]>("https://localhost:7087/api/quarto/listar"),
      clientes: this.client.get<Cliente[]>("https://localhost:7087/api/cliente/listar")
    }).subscribe({
      next: (result: { quartos: Quarto[], clientes: Cliente[] }) => {
        this.quartos = result.quartos;
        this.clientes = result.clientes;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

cadastrar(): void {
  let aluguel: Aluguel = {
    clienteId: this.clienteId,
    quartoId: this.quartoId,
    dias: this.dias || 0,           //Sem um iniciador as duas não tavam funciando
    valorTotal: this.valorTotal || 0  
  }; 
  this.client
  .post<Aluguel>('https://localhost:7087/api/aluguel/cadastrar', aluguel)
  .subscribe({
    next: (aluguel) => {
      this.snackBar.open('Aluguel cadastrado com sucesso!', 'Fechar', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.router.navigate(['pages/aluguel/listar']);
    },
    error: (error) => {
      if (error.status === 409) {
        this.snackBar.open('O quarto já está alugado!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      } else {
        console.log(error);
      }
    },
  });

  }
}

