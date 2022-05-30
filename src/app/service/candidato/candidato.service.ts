import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseService } from '../database/database.service'; 

@Injectable({
  providedIn: 'root',
})

export class CandidatoService {

  private db: SQLiteObject;

  constructor(private dbProvider: DatabaseService) { }

  public insertCandidato (candidato: Candidato){
    return this.dbProvider.getDB()
      .then ((db:SQLiteObject) => {
        let sql = 'insert into candidato(nome_candidato, numero_candidato, ativo, partido_id) values (?,?,?,?)';
        let data = [candidato.nome_candidato, candidato.numero_candidato, candidato.ativo ? 1:0 ,candidato.partido_id];
        
        return db.executeSql(sql,data)
          .catch ((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public updateCandidato(candidato: Candidato) {
    return this.dbProvider.getDB()
    .then ((db:SQLiteObject) => {
      let sql = 'update candidato set nome_candidato = ?, numero = ?, ativo = ?, partido_id = ?  where id = ?';
      let data = [candidato.nome_candidato, candidato.numero_candidato, candidato.ativo ? 1:0 ,candidato.partido_id, candidato.id];
      
      return db.executeSql(sql,data)
        .catch ((e) => console.error(e));
   })
  .catch((e) => console.error(e));
  }

  public removeCandidato(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from candidato where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getCandidatoId(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from candidato where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let candidato = new Candidato();
              candidato.id = item.id;
              candidato.nome_candidato = item.nome_candidato; 
              candidato.numero_candidato = item.numero_candidato;
              candidato.ativo = item.ativo;
              candidato.partido_id = item.partido_id;

              return candidato;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAllCandidatos(ativo: boolean, nome: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT p.*, c.nome as partido_nome FROM candidato p inner join partido c on p.partido_id = c.id where p.ativo = ?';
        var data: any[] = [ativo ? 1 : 0];

        // filtrando pelo nome
        if (nome) {
          sql += ' and p.name like ?'
          data.push('%' + nome + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let candidatos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var candidato = data.rows.item(i);
                candidatos.push(candidato);
              }
              return candidatos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Candidato {
  id: number;
  nome_candidato: string;
  numero_candidato: number;
  ativo: boolean;
  partido_id: number;
}