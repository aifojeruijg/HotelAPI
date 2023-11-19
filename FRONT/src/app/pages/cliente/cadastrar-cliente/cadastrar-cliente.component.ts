import { validateHorizontalPosition } from "@angular/cdk/overlay";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente.models";

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent {
  nome: string = "";
  cpf: string = "";
  telefone: string = "";

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

    
  cadastrar(): void {
    let cliente: Cliente = {
      nome: this.nome,
      cpf: this.cpf,
      telefone: this.telefone,
    };

    this.client
     .post<Cliente>("https://localhost:7087/api/cliente/cadastrar", cliente)
     .subscribe({
        next: (cliente) => {
          this.snackBar.open("Cliente cadastrado com sucesso!", "Fechar", {
            duration: 2500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/cliente/listar"]);
        },
        error: (erro) => {
          this.snackBar.open("O CPF deve conter exatamente 11 números!", "Fechar", {
            duration: 5000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        },
     });
  }

}

