import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Aluguel } from 'src/app/models/aluguel.models';
import { Cliente } from 'src/app/models/cliente.models';
import { Quarto } from 'src/app/models/quarto.model';

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

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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
        console.log(error);
      },
    });
  }
}

