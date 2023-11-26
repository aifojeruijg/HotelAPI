import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluguel } from 'src/app/models/aluguel.models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-aluguel',
  templateUrl: './listar-aluguel.component.html',
  styleUrls: ['./listar-aluguel.component.css']
})
export class ListarAluguelComponent implements OnInit {
  colunasTabela: string [] = [
    "id",
    "quarto",
    "cliente",
    "valorTotal",
    "dataEntrada",
    "dataSaida",
    "trocarquarto",
    "checkOut",
  ]

  alugueis: Aluguel[] = [];

  constructor(private client: HttpClient, private router: Router,  private snackBar: MatSnackBar,) {}

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

  checkOut(aluguelId: number) {
    this.client
     .delete(`https://localhost:7087/api/aluguel/checkout/${aluguelId}`)
      .subscribe({
        next: () => {
          this.snackBar.open("Check Out realizado com sucesso!", "Fechar", {
            duration: 1500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.client
           .get<Aluguel[]>("https://localhost:7087/api/aluguel/listar")
            .subscribe({
              next: (alugueis) => {
                this.alugueis = alugueis;
              }
            })
        }
      })
  }
}



