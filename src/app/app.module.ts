import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ApiProvider } from '../providers/api/api';
import { FunctionsProvider } from '../providers/functions/functions';

import { AdicionarPage } from '../pages/adicionar/adicionar';
import { MedicoesPage } from '../pages/medicoes/medicoes';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetalhePage } from '../pages/detalhe/detalhe';
import { EditaPage } from '../pages/edita/edita';
import { ResultadoPage } from '../pages/resultado/resultado';
import { LoginPage } from '../pages/login/login';
import { RelatoriosPage } from '../pages/relatorios/relatorios';
import { RelatorioResultadoPage } from '../pages/relatorio-resultado/relatorio-resultado';
import { AlimentosPage } from '../pages/alimentos/alimentos';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';  

import { TurnoPipe } from '../pipes/turno/turno';
import { DataPipe } from '../pipes/data/data';
import { DiaSemanaPipe } from '../pipes/dia-semana/dia-semana';
import { MesPipe } from '../pipes/mes/mes';
import { HorarioPipe } from '../pipes/horario/horario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AdicionarPage,
    MedicoesPage,
    DetalhePage,
    EditaPage,  
    ResultadoPage,
    LoginPage,
    RelatoriosPage,
    RelatorioResultadoPage,
    AlimentosPage,
    CadastrarPage,
    TurnoPipe,
    DataPipe,
    DiaSemanaPipe,
    MesPipe,
    HorarioPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AdicionarPage,
    MedicoesPage,
    DetalhePage,
    EditaPage,
    ResultadoPage,
    RelatoriosPage,
    RelatorioResultadoPage,
    LoginPage,
    AlimentosPage,
    CadastrarPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    FunctionsProvider,
  ]
})
export class AppModule {}
  