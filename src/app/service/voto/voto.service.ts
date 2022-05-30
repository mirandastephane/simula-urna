import { Injectable, OnInit } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseService } from '../database/database.service'; 

@Injectable({
  providedIn: 'root'
})
export class VotoService implements OnInit {

  ngOnInit() {

  }

  constructor(private dbProvider: DatabaseService) { }

  public insertVoto (voto: Voto){
    return this.dbProvider.getDB()
      .then ((db:SQLiteObject) => {
        let sql = 'insert into votos (numero_candidato) values (?)';
        let data = [voto.numero_candidato];
        
        return db.executeSql(sql,data)
          .catch ((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public getAllVotos (voto: Voto){
    return this.dbProvider.getDB()
      .then ((db:SQLiteObject) => {
        let sql = 'SELECT numero_candidato, COUNT(*) AS qtd FROM votos WHERE numero_candidato IN (SELECT numero_candidato from candidato)  GROUP BY numero_candidato ORDER BY qtd desc';
        let data = [voto.numero_candidato];
        
        return db.executeSql(sql,data)
          .then ((data: any) => {
            if (data.rows.length > 0) {
              let votos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var voto = data.rows.item(i).qtd;
                votos.push(voto);
              }
              return votos;
            } else{
              return [];
            }
          })
          .catch ((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Voto {
  id: number;
  numero_candidato: number;;
}