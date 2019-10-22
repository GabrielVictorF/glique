import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Navbar } from 'ionic-angular';
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
import { PerfilPage } from '../pages/perfil/perfil';
import { ModalRelatorioPage } from '../pages/relatorio-resultado/modal-relatorio/modal-relatorio';
import { FeedbackPage } from '../pages/feedback/feedback';
import { HelpPage } from '../pages/help/help';
import { DicasPage } from '../pages/dicas/dicas';

import { TurnoPipe } from '../pipes/turno/turno';
import { DataPipe } from '../pipes/data/data';
import { DiaSemanaPipe } from '../pipes/dia-semana/dia-semana';
import { MesPipe } from '../pipes/mes/mes';
import { HorarioPipe } from '../pipes/horario/horario';

import { MenuComponent } from '../components/menu/menu';

//import * as Sentry from 'sentry-cordova';
import * as Sentry from '@sentry/browser';
import { errorHandler } from '@angular/platform-browser/src/browser';

Sentry.init({
  dsn: "https://6c712accdaf14eb1a7d3f6e733815ba7@sentry.io/1728696",
  beforeSend(event, hint) {
    console.log(event)
    console.log(hint)
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      localStorage.setItem('eror_event_id', event.event_id);
      //var evento = new CustomEvent('sentry-report', {'detail': event.event_id});
      //document.dispatchEvent(evento);  
      //console.log("Erro enviado ao Sentry");
    }
    return event;
  }
});


export class SentryIonicErrorHandler extends IonicErrorHandler {
  handleError(error) {
    super.handleError(error);
    try {
      Sentry.captureException(error.originalError || error);
    } catch (e) {
      console.error(e);
    }
  }
}

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
    PerfilPage,
    ModalRelatorioPage,
    FeedbackPage,
    HelpPage,
    DicasPage,
    TurnoPipe,
    DataPipe,
    DiaSemanaPipe,
    MesPipe,
    HorarioPipe,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          backButtonText: 'Voltar'
        }
      }
    }),
    HttpClientModule
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
    CadastrarPage,
    PerfilPage,
    ModalRelatorioPage,
    FeedbackPage,
    HelpPage,
    DicasPage
  ],
  providers: [
    //{provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: ErrorHandler, useClass: SentryIonicErrorHandler },
    ApiProvider,
    FunctionsProvider
  ]
})
export class AppModule { }
