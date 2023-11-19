import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Quarto } from 'src/app/models/quarto.model';

@Component({
  selector: 'app-listar-quarto',
  templateUrl: './listar-quarto.component.html',
  styleUrls: ['./listar-quarto.component.css']
})
export class ListarQuartoComponent {
  colunasTabela: string[] = [
    "id",
    "numeroQuarto",
    "tipoQuarto",
    "diaria",
    "status",
    "alterar",
    "deletar",
  ];

  quartos: Quarto[] = [];

  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.client
     .get<Quarto[]>("https://localhost:7087/api/quarto/listar")
      .subscribe({
        next: (quartos) => {
          this.quartos = quartos;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  deletar(quartoId: number) {
    this.client
    .delete(`https://localhost:7087/api/quarto/deletar/${quartoId}`)
     .subscribe({
      next: () => {
        this.snackBar.open("Quarto deletado com sucesso!", "Fechar", {
          duration: 1500,
          horizontalPosition: "right",
          verticalPosition: "top",
        });

        this.client
         .get<Quarto[]>("https://localhost:7087/api/quarto/listar")
          .subscribe({
            next: (quartos) => {
              this.quartos = quartos;
            },
          });
      },
      error: (erro) => {
        console.log(erro);
      }
     })
  }

}
