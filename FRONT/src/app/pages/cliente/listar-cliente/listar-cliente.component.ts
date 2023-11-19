import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.models';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent {
  colunasTabela: string[] = [
    "id",
    "nome",
    "cpf",
    "telefone",
    "alterar",
    "deletar",
  ];

clientes: Cliente[] = [];

constructor(
  private client: HttpClient, 
  private snackBar: MatSnackBar,
  private router: Router,
  ) {}


ngOnInit(): void {
  this.client
    .get<Cliente[]>("https://localhost:7087/api/cliente/listar")
    .subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (erro) => {
        console.log(erro);
      },
    });
}


deletar(clienteId: number) {
  this.client
    .delete(`https://localhost:7087/api/cliente/deletar/${clienteId}`)
    .subscribe({
      next: () => {
        this.snackBar.open("Cliente deletado com sucesso!", "Fechar", {
          duration: 1500,
          horizontalPosition: "right",
          verticalPosition: "top",
        });

        // Após a exclusão bem-sucedida, atualiza a lista de clientes
        this.client
        .get<Cliente[]>("https://localhost:7087/api/cliente/listar")
        .subscribe({
          next: (clientes) => {
            this.clientes = clientes;
          },
          error: (erro) => {
            console.log(erro);
          }
        });
      },
      error: (erro) => {
        console.log(erro);
      }
    })
}

  
}
