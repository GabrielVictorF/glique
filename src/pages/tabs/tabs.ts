import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AdicionarPage } from '../adicionar/adicionar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AdicionarPage;

  constructor() {

  }
}
