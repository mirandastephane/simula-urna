import { Component } from '@angular/core';
import { CrudService } from '../service/crud/crud.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  numberCand: string = '';
  nameCand: string = '';
  partyCand: string = '';
  candidateList: Array<any>;
  candidateID: number = null;

  constructor(private crud: CrudService) { }

  ngOnInit() {
    this.crud.databaseConn();
  }
  
  ionViewDidEnter() {  
    this.candidateList = this.crud.getAllCandidate(); 
  }

  create() {
    this.crud.addCandidate(this.numberCand, this.nameCand, this.partyCand);
    this.candidateList = this.crud.getAllCandidate();
    this.numberCand = '';
    this.nameCand = '';
    this.partyCand = '';
  }

  read(id) {
    this.crud.getCandidate(id).then((res) => {
      this.candidateID = res['candidate_id']
      this.numberCand = res['numberCand'];
      this.nameCand = res['nameCand'];
      this.partyCand = res['partyCand'];
    })
  }

  update(){
    this.crud.setCandidate(this.candidateID, this.numberCand, this.nameCand, this.partyCand);
    this.candidateID = null;
    this.numberCand = '';
    this.nameCand = '';
    this.partyCand = '';
    this.candidateList = this.crud.getAllCandidate();
  }

  delete(id) {
    this.crud.deleteCandidate(id);
    this.candidateList = this.crud.getAllCandidate();
  }

}
