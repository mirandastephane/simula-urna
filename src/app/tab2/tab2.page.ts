import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  searchCandidates: string;
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

  nomeVariavel: string;
  count: number = 0;
  candidate1: number = 0;
  candidate2: number = 0;
  candidate3: number = 0;

  constructor() {}

  ngOnInit() { }

  clearSearch() {
    this.searchCandidates = '';
  }

  funcao() {
    alert("FIM!")

  if(this.searchCandidates == "12"){
    this.candidate1++;
    console.log("Candidato 1: ", this.candidate1 )
  }

  if(this.searchCandidates == "24"){
    this.candidate2++;
    console.log("Candidato 2: ",this.candidate2)
  }

  if(this.searchCandidates == "36"){
    this.candidate3++;
    console.log("Candidato 3: ",this.candidate1)
  }

  this.count =  this.candidate1 + this.candidate2 + this.candidate3 ;

  console.log("Total de Votos Apurados: ", this.count)

  this.clearSearch();
  }

}
