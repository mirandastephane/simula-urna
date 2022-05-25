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
  vBlank: number = 0;
  percentCandidate1: number = 0;
  percentCandidate2: number = 0;
  percentCandidate3: number = 0;
  percentBlank: number = 0;

  constructor() {}

  ngOnInit() { }

  clearSearch() {
    this.findCandidates = '';
  }

  blank(){
    //alert("Voto computado com sucesso!")
  }

  alert() {
    //alert("Voto computado com sucesso!")

  if(this.findCandidates == "12"){
    this.candidate1++;
    console.log("Candidato 1: ", this.candidate1 )
  }

  if(this.findCandidates == "24"){
    this.candidate2++;
    console.log("Candidato 2: ",this.candidate2)
  }

  if(this.findCandidates == "36"){
    this.candidate3++;
    console.log("Candidato 3: ",this.candidate1)
  }

  if(this.findCandidates == "0"){
    this.vBlank++;
    console.log("Voto Branco", this.vBlank )
  }

  this.count =  this.candidate1 + this.candidate2 + this.candidate3 ;

  this.percentCandidate1 = (this.candidate1 / this.count) * 100; 
  this.percentCandidate2 = (this.candidate2 / this.count) * 100; 
  this.percentCandidate3 = (this.candidate3 / this.count) * 100; 
  this.percentBlank = (this.vBlank / this.count) * 100; 


  console.log("Total de Votos Apurados: ", this.count)
  console.log("% de Votos Apurados: ", this.percentCandidate1)
  console.log("% de Votos Apurados: ", this.percentCandidate2)
  console.log("% de Votos Apurados: ", this.percentCandidate3)
  console.log("% de Votos Apurados: ", this.percentBlank)



  this.clearSearch();

  this.blank();

  }

}
