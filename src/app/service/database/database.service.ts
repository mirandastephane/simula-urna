import { Injectable, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})

export class DatabaseService implements OnInit {

  constructor( private sqlite: SQLite, private platform: Platform) { }

  ngOnInit() {
    this.getDB();
  }

  public getDB(){
    return this.sqlite.create({

      name: 'candidato.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
   public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }
    /**
   * Criando as tabelas no banco de dados
   * @param db
   */

  private createTables (db:SQLiteObject){
   // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS partido(id INTEGER primary key AUTOINCREMENT NOT NULL, nome TEXT)']
      ['CREATE TABLE IF NOT EXISTS votos (voto_id INTEGER primary key AUTOINCREMENT NOT NULL, numero_candidato INTEGER, FOREIGN KEY (numero_candidato) REFERENCES candidato(numero_candidato))']
      ['CREATE TABLE IF NOT EXISTS candidato(id INTEGER primary key AUTOINCREMENT NOT NULL, nome_candidato TEXT, numero_candidato INTEGER, ativo INTEGER,partido_id INTEGER, FOREIGN KEY (partido_id) REFERENCES partido(id))'],
    ])
    .then(() => console.log('Tabelas criadas'))
    .catch(e => console.error('Erro ao criar as tabelas', e));
  }

    /**
   * Incluindo os dados padrões
   * @param db
   */

  private insertDefaultItems (db:SQLiteObject){
    db.executeSql('select COUNT(id) as qtd from partido', [])
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {

        // Criando as tabelas
        db.sqlBatch([
          ['insert into partido (name) values (?)', ['PNB']],
          ['insert into partido (name) values (?)', ['PNF']],
          ['insert into partido (name) values (?)', ['PNC']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));

      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de partidos', e));
  }

}