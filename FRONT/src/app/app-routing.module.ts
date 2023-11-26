import { ListarQuartoComponent } from './pages/quarto/listar-quarto/listar-quarto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClienteComponent } from './pages/cliente/listar-cliente/listar-cliente.component';
import { CadastrarClienteComponent } from './pages/cliente/cadastrar-cliente/cadastrar-cliente.component';
import { AlterarClienteComponent } from './pages/cliente/alterar-cliente/alterar-cliente.component';
import { CadastrarQuartoComponent } from './pages/quarto/cadastrar-quarto/cadastrar-quarto.component';
import { AlterarQuartoComponent } from './pages/quarto/alterar-quarto/alterar-quarto.component';
import { CadastrarAluguelComponent } from './pages/aluguel/cadastrar-aluguel/cadastrar-aluguel.component';
import { ListarAluguelComponent } from './pages/aluguel/listar-aluguel/listar-aluguel.component';
import { TrocarQuartoComponent } from './pages/aluguel/trocar-quarto/trocar-quarto.component';


const routes: Routes = [
  {
    path: "",
    component: ListarClienteComponent,
  },
  {
    path: "pages/cliente/listar",
    component: ListarClienteComponent,
  },
  {
    path: "pages/cliente/cadastrar",
    component: CadastrarClienteComponent,
  },
  {
    path: "pages/cliente/alterar/:id",
    component: AlterarClienteComponent,
  },
  {
    path: "pages/quarto/listar",
    component: ListarQuartoComponent,
  },
  {
    path: "pages/quarto/cadastrar",
    component: CadastrarQuartoComponent,
  },
  {
    path: "pages/quarto/alterar/:id",
    component: AlterarQuartoComponent,
  },
  {
    path: "pages/aluguel/listar",
    component: ListarAluguelComponent,
  },
  {
    path: "pages/aluguel/cadastrar",
    component: CadastrarAluguelComponent,
  },
  {
    path: "pages/aluguel/trocarquarto/:id",
    component: TrocarQuartoComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
