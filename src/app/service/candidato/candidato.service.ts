import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseService } from '../database/database.service'; 

@Injectable({
  providedIn: 'root',
})

export class CandidatoService {

  constructor(private dbProvider: DatabaseService) { }

  public insert (candidato: Candidato){
    return this.dbProvider.getDB()
      .then ((db:SQLiteObject) => {
        let sql = 'insert into candidato(nome_candidato, vice_candidato, numero, ativo, partido_id) values (?,?,?,?,?)';
        let data = [candidato.nome_candidato, candidato.vice_candidato, candidato.numero, candidato.ativo ? 1:0 ,candidato.partido_id];
        
        return db.executeSql(sql,data)
          .catch ((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(candidato: Candidato) {
    return this.dbProvider.getDB()
    .then ((db:SQLiteObject) => {
      let sql = 'update candidato set nome_candidato = ?, vice_candidato = ?, numero = ?, ativo = ?, partido_id = ?  where id = ?';
      let data = [candidato.nome_candidato, candidato.vice_candidato, candidato.numero, candidato.ativo ? 1:0 ,candidato.partido_id, candidato.id];
      
      return db.executeSql(sql,data)
        .catch ((e) => console.error(e));
   })
  .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from candidato where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
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
              candidato.nome_candidato = item.candidato;
              candidato.vice_candidato = item.vice_candidato;
              candidato.numero = item.numero;
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

  public getAll(ativo: boolean, name: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT p.*, c.name as partido_name FROM candidato p inner join partido c on p.partido_id = c.id where p.ativo = ?';
        var data: any[] = [ativo ? 1 : 0];

        // filtrando pelo nome
        if (name) {
          sql += ' and p.name like ?'
          data.push('%' + name + '%');
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
  vice_candidato: number;
  numero: number;
  ativo: boolean;
  partido_id: number;
}