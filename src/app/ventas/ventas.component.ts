import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../servicios/presupuestos.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  chartOptions = {
    responsive: true
  }

  presupuestos:any;
  ptosPrMes:any;
  ptosSgMes:any;
  ptosTrMes:any;
  diaPrMes:any = new Date("2018-04-01").valueOf();
  diaSgMes:any = new Date("2018-05-01").valueOf();
  diaTrMes:any = new Date("2018-06-01").valueOf();
  diaCtMes:any = new Date("2018-07-01").valueOf();
  totalPrMes:number = 0;
  totalSgMes:number = 0;
  totalTrMes:number = 0;
  prMes:string = 'Abril';
  sgMes:string = 'Mayo';
  trMes:string = 'Junio';
  labelTrimestre:string = 'Presupuestos 2T';
  chartPtosTrimestre:any = [];

  constructor(private presupuestosService: PresupuestosService) { }

  ngOnInit() {
    this.cargarGraficoPresupuestos();
  }

  cargarGraficoPresupuestos(){
    this.presupuestosService.getPresupuestos()
                .subscribe((resp:any)=>{
                  this.presupuestos = resp.presupuestos;
                  this.ptosPrMes = this.presupuestos.filter(element => new Date(element.fecha).valueOf() >= this.diaPrMes && new Date(element.fecha).valueOf() < this.diaSgMes)
                  this.ptosPrMes.forEach(ptoPrMes=>{
                    this.totalPrMes += ptoPrMes.total;
                  })
                  this.ptosSgMes = this.presupuestos.filter(element => new Date(element.fecha).valueOf() >= this.diaSgMes && new Date(element.fecha).valueOf() < this.diaTrMes)
                  this.ptosSgMes.forEach(ptoSgMes=>{
                    this.totalSgMes += ptoSgMes.total;
                  })
                  this.ptosTrMes = this.presupuestos.filter(element => new Date(element.fecha).valueOf() >= this.diaTrMes && new Date(element.fecha).valueOf() < this.diaCtMes)
                  this.ptosTrMes.forEach(ptoTrMes=>{
                    this.totalTrMes += ptoTrMes.total;
                  })
                 
                  this.chartPtosTrimestre = new Chart('grafico1',{
                    type: 'line',
                    data: {
                      labels: [this.prMes,this.sgMes,this.trMes],
                      datasets: [
                        {
                          data: [this.totalPrMes,this.totalSgMes,this.totalTrMes],
                          label: this.labelTrimestre,
                          borderColor: "#dc143c",
                          fill: false
                        }
                      ]
                    }
                  })

                },(error)=>{
                  console.log(error)
                })
  }

  primerTrimestre(){
    this.diaPrMes = new Date("2018-01-01").valueOf();
    this.diaSgMes = new Date("2018-02-01").valueOf();
    this.diaTrMes = new Date("2018-03-01").valueOf();
    this.diaCtMes = new Date("2018-04-01").valueOf();
    this.totalPrMes = 0;
    this.totalSgMes = 0;
    this.totalTrMes = 0;
    this.prMes = 'Enero';
    this.sgMes = 'Febrero';
    this.trMes = 'Marzo';
    this.labelTrimestre = 'Presupuestos 1T';
    this.chartPtosTrimestre.destroy();
    this.cargarGraficoPresupuestos();
  }

  segundoTrimestre(){
    this.diaPrMes = new Date("2018-04-01").valueOf();
    this.diaSgMes = new Date("2018-05-01").valueOf();
    this.diaTrMes = new Date("2018-06-01").valueOf();
    this.diaCtMes = new Date("2018-07-01").valueOf();
    this.totalPrMes = 0;
    this.totalSgMes = 0;
    this.totalTrMes = 0;
    this.prMes = 'Abril';
    this.sgMes = 'Mayo';
    this.trMes = 'Junio';
    this.labelTrimestre = 'Presupuestos 2T';
    this.chartPtosTrimestre.destroy();
    this.cargarGraficoPresupuestos();
  }

}
