import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.models';

@Component({
  selector: 'app-alterar-cliente',
  templateUrl: './alterar-cliente.component.html',
  styleUrls: ['./alterar-cliente.component.css']
})
export class AlterarClienteComponent {
  clienteId: number = 0;
  nome: string = "";
  cpf: string = "";
  telefone: string = "";

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parametros) => {
        let {id} = parametros;
        this.client.get<Cliente>(`https://localhost:7087/api/cliente/buscar/${id}`).subscribe({
          next: (cliente) => {
            this.clienteId = cliente.clienteId!;
            this.nome = cliente.nome;
            this.cpf = cliente.cpf;
            this.telefone = cliente.telefone;
          },
          error: (erro) => {
            console.log(erro);
          },
        });
      },
    });
  }

alterar(): void {
  let cliente: Cliente = {
    nome : this.nome,
    cpf : this.cpf,
    telefone : this.telefone,
  };
  console.log(cliente);

  this.client.put<Cliente>(`https://localhost:7087/api/cliente/alterar/${this.clienteId}`, cliente).subscribe({
    next: (cliente) => {
      this.snackBar.open("Produto alterado com sucesso!", "Fechar", {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      this.router.navigate(["pages/cliente/listar"]);
    },
    error: (erro) => {
      console.log(erro);
    },
  });

}

}
