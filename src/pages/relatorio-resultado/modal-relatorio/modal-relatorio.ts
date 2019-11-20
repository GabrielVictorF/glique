import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


import * as CanvasJS from './canvasjs.min.js';

@Component({
    templateUrl: 'modal-relatorio.html'
})

export class ModalRelatorioPage {
    public chart;
    public data = this.navParams.get("data");
    constructor(public viewCtrl: ViewController, public navParams: NavParams) {
        console.log('Turnos')
        console.log(this.data)
    }

    ionViewWillEnter() {
        console.log("Enter modal page");
        this.geraRelatorioTurno();        
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    geraRelatorioTurno() {
        this.chart = new CanvasJS.Chart("chartTurno", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Registros por turno"
          },
          legend: {
            cursor: "pointer",
            itemClick: explodePie
          },
          data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent:"<b>{name}</b>: {y} registros (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: [
              { y: this.data[0], name: "Jejum" },
              { y: this.data[1], name: "Antes do almoço" },
              { y: this.data[2], name: "Depois do almoço" },
              { y: this.data[3], name: "Lanche" },
              { y: this.data[4], name: "Antes do jantar"},
              { y: this.data[5], name: "Depois do jantar"}
            ]
          }]
        });
        
        this.chart.render();
    
        function explodePie (e) {
          if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
          } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
          }
          e.chart.render();
        
        }
      }
}