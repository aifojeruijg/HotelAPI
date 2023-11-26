import { Cliente } from './../../../models/cliente.models';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluguel } from 'src/app/models/aluguel.models';
import { Quarto } from 'src/app/models/quarto.model';

@Component({
  selector: 'app-trocar-quarto',
  templateUrl: './trocar-quarto.component.html',
  styleUrls: ['./trocar-quarto.component.css']
})
export class TrocarQuartoComponent {
  aluguelId: number = 0;
  quartoId: number = 0;
  quartos: Quarto[] = [];
  clienteId: number = 0;
  dias: number = 0;
  valorTotal: number = 0;
  clientes: Cliente[] = [];
  aluguel : Aluguel[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parametros) => {
        let { id } = parametros;
        this.client.get<Aluguel>(`https://localhost:7087/api/aluguel/buscar/${id}`).subscribe({
          next: (aluguel) => {
            this.aluguelId = aluguel.aluguelId!;
            this.quartoId = aluguel.quarto?.quartoId!;
            this.clienteId = aluguel.cliente?.clienteId!;

            this.client.get<Cliente[]>("https://localhost:7087/api/cliente/listar").subscribe({
              next: (clientes) => {
                this.clientes = clientes;
              },
              error: (erro) => {
                console.log(erro);
              },
            });

            this.client.get<Quarto[]>("https://localhost:7087/api/quarto/listar").subscribe({
              next: (quartos) => {
                this.quartos = quartos;
              },
              error: (erro) => {
                console.log(erro);
              },
            });
          },
          error: (erro) => {
            console.log(erro);
          },
        });
      },
    });
  }

  trocarquarto(): void {
    // Encontrar o novo quarto selecionado pelo usuário
    const novoQuarto = this.quartos.find(q => q.quartoId === this.quartoId);
  
    if (!novoQuarto) {
      console.error('Quarto não encontrado');
      return;
    }
  
    // Recalcular o valor total com base na nova diária do quarto
    const novoValorTotal = this.dias * novoQuarto.diaria;
  
    let aluguel: Aluguel = {
      quartoId: this.quartoId,
      dias: this.dias,
      valorTotal: novoValorTotal, // Atualizar o valor total com o novo cálculo
    };
  
    this.client.put<Aluguel>(`https://localhost:7087/api/aluguel/trocarquarto/${this.aluguelId}`, aluguel).subscribe({
      next: (aluguel) => {
        this.snackBar.open("Quarto alterado com sucesso!", "Fechar", {
          duration: 1500,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(['pages/aluguel/listar']);
      },
      error: (error) => {
        console.log(error);
        // Trate o erro aqui, mostre uma mensagem de erro ao usuário, etc.
      }
    });
  }
  
  
  
}
