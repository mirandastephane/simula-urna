import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

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

  count: number = 0;
  candidate1: number = 0;
  candidate2: number = 0;
  candidate3: number = 0;
  percentCandidate1: number = 0;
  percentCandidate2: number = 0;
  percentCandidate3: number = 0;

  constructor() {}

  ngOnInit() { }

  clearField() {
    this.findCandidates = '';
  }


  alert() {
    alert("Voto computado com sucesso!");

  if(this.findCandidates == "12"){
    this.candidate1++;
  }

  if(this.findCandidates == "24"){
    this.candidate2++;
  }

  if(this.findCandidates == "36"){
    this.candidate3++;
  }

  this.clearField();


  //Contabiliza o total de votos
  this.count =  this.candidate1 + this.candidate2 + this.candidate3;

  //Calcula o percentual de votos para cada candidato
  this.percentCandidate1 = (this.candidate1 / this.count) * 100; 
  this.percentCandidate2 = (this.candidate2 / this.count) * 100; 
  this.percentCandidate3 = (this.candidate3 / this.count) * 100; 
  }

}
