import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  count: number = 0;
  candidate1: number = 0;
  candidate2: number = 0;
  candidate3: number = 0;
  candidateBlank: number = 0;
  percentCandidate1: number = 0;
  percentCandidate2: number = 0;
  percentCandidate3: number = 0;
  percentBlank: number = 0;

  findCandidates: string;
  candidates = [
    {
      "name": "Priscilla Sena",
      "number": "12",
      "part": "MUSA",
      "image": "../assets/img/Priscila-Senna7.jpeg"
    },
    {
      "name": "Rafaella Santos",
      "number": "24",
      "part": "FAVORITA",
      "image": "../assets/img/raphaela-santos.jpg"
    },
    {
      "name": "Tayara Andreza",
      "number": "36",
      "part": "TAY",
      "image": "../assets/img/tayara-andreza.jpg"
    },

  ];

  constructor(public alertController: AlertController) {}

  ngOnInit() { }

  clearField() {
    this.findCandidates = '';
  }

  async alertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'FIM!',
      message: 'Seu voto foi computado com sucesso.',
      buttons: ['OK']
    });

    alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  
  }

  async alertWarning() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ATENÇÃO',
      message: 'Candidato Não Faz Parte desta Eleição.',
      buttons: ['OK']
    });

    alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  
  }

  async alertInvalid() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ATENÇÃO',
      message: 'Digite Número de Candidato Válido',
      buttons: ['OK']
    });

    alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  
  }

  white(){
    this.findCandidates = '0';
    this.calculate();
  }

  calculate(){

  if (this.findCandidates == null && this.findCandidates == ""){
    this.alertWarning();
  } else if (this.findCandidates !=="12" && this.findCandidates !== "24" && this.findCandidates !== "36" && this.findCandidates !=="0"){
    this.alertInvalid();
  } else{
    this.alertConfirm();
  }

  if(this.findCandidates == "12"){
    this.candidate1++;
  }

  if(this.findCandidates == "24"){
    this.candidate2++;
  }

  if(this.findCandidates == "36"){
    this.candidate3++;
  }
  
  if (this.findCandidates == '0'){
    this.candidateBlank++;
  }

  this.clearField();


  //Contabiliza o total de votos
  this.count =  this.candidate1 + this.candidate2 + this.candidate3 + this.candidateBlank;

  //Calcula o percentual de votos para cada candidato
  this.percentCandidate1 = parseFloat(((this.candidate1 / this.count) * 100).toFixed(2));
  this.percentCandidate2 = parseFloat(((this.candidate2 / this.count) * 100).toFixed(2)); 
  this.percentCandidate3 = parseFloat(((this.candidate3 / this.count) * 100).toFixed(2));
  this.percentBlank = parseFloat(((this.candidateBlank/this.count) * 100).toFixed(2));
 
  }
}
