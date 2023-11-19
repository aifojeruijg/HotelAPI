import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Quarto } from 'src/app/models/quarto.model';

@Component({
  selector: 'app-alterar-quarto',
  templateUrl: './alterar-quarto.component.html',
  styleUrls: ['./alterar-quarto.component.css']
})
export class AlterarQuartoComponent {
  quartoId: number = 0;
  tipoQuarto: string = "";
  numeroQuarto: number | null = null;
  diaria: number | null = null;

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parametros) => {
        let {id} = parametros;
        this.client.get<Quarto>(`https://localhost:7087/api/quarto/buscar/${id}`).subscribe({
          next: (quarto) => {
            this.quartoId = quarto.quartoId!;
            this.tipoQuarto = quarto.tipoQuarto;
            this.numeroQuarto = quarto.numeroQuarto;
            this.diaria = quarto.diaria;
          },
          error: (erro) => {
            console.log(erro);
          },
        });
      }
    })
  }

  alterar(): void {
    let quarto: Quarto = {
      numeroQuarto : this.numeroQuarto!,
      tipoQuarto : this.tipoQuarto,
      diaria : this.diaria!
    };
    console.log(quarto);

    this.client.put<Quarto>(`https://localhost:7087/api/quarto/alterar/${this.quartoId}`, quarto).subscribe({
      next: (quarto) => {
        this.snackbar.open("Quarto alterado com sucesso!", "Fechar", {
          duration: 2000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["pages/quarto/listar"]);
      },
      error: (erro) => {
        console.log(erro);
      }
    })
  }

}
