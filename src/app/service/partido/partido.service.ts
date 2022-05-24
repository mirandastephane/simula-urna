import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root',
})

export class PartidoService {

  constructor(private dbProvider: DatabaseService) { }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {

      return db.executeSql('select * from partido', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let partidos: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var partido = data.rows.item(i);
              partidos.push(partido);
            }
            return partidos;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}
