import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { CandidatoService, Candidato } from '../service/candidato/candidato.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  candaidatos: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private candidatoProvider: CandidatoService, private router: Router ) { }

  ionViewDidEnter() {
    this.getAllCandidatos();
  }

  getAllCandidatos(){
    this.candidatoProvider.getAll(!this.onlyInactives,this.searchText)
      .then((result: any[]) => {
        this.candaidatos = result;
      });
  }

  addCandidato(){
    this.router.navigateByUrl('EditCandidatoPage');
  }

  //editCandidato(id: number){
  //  this.router.navigateByUrl('EditCandidatoPage', {id:id});
  //}

  removeCandidato (candidato: Candidato){
    this.candidatoProvider.remove(candidato.id)
      .then(() => {
        var index = this.candaidatos.indexOf(candidato);
        this.candaidatos.splice (index,1);
        this.toast.create({message: 'Candidato removido.', duration: 3000, position: 'bottom'})
      })
  }

  filterCandidato (ev:any){
    this.getAllCandidatos();
  }

}
