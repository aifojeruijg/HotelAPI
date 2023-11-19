import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Quarto } from 'src/app/models/quarto.model';

@Component({
  selector: 'app-cadastrar-quarto',
  templateUrl: './cadastrar-quarto.component.html',
  styleUrls: ['./cadastrar-quarto.component.css']
})
export class CadastrarQuartoComponent {
  numeroQuarto: string = "";
  tipoQuarto: string = "";
  diaria: string = "";
  status: string = "";

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ){}


    cadastrar(): void {
      let quarto: Quarto = {
        numeroQuarto : Number.parseInt(this.numeroQuarto),
        tipoQuarto : this.tipoQuarto,
        diaria : Number.parseFloat(this.diaria),
        status : "Disponível",
      };

      this.client
       .post<Quarto>("https://localhost:7087/api/quarto/cadastrar", quarto)
       .subscribe({
        next: (quarto) => {
          this.snackBar.open("Quarto cadastrado com sucesso!", "Fechar", {
            duration: 2000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/quarto/listar"]);
        },
        error: (erro) => {
          console.log(erro);
        },
       });

    }

}
