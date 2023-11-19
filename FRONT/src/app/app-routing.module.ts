import { ListarQuartoComponent } from './pages/quarto/listar-quarto/listar-quarto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClienteComponent } from './pages/cliente/listar-cliente/listar-cliente.component';
import { CadastrarClienteComponent } from './pages/cliente/cadastrar-cliente/cadastrar-cliente.component';
import { AlterarClienteComponent } from './pages/cliente/alterar-cliente/alterar-cliente.component';
import { CadastrarQuartoComponent } from './pages/quarto/cadastrar-quarto/cadastrar-quarto.component';
import { AlterarQuartoComponent } from './pages/quarto/alterar-quarto/alterar-quarto.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
