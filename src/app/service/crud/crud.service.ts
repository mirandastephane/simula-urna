import { Injectable, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class CrudService implements OnInit {

  private dbInstance: SQLiteObject;
  public nRows: number = 0;

  constructor(private platform: Platform, private sqlite: SQLite) { }

  ngOnInit() {
    this.databaseConn();
  }

  databaseConn() {
    this.platform.ready().then(() => {
      this.sqlite.create({ name: 'urnaeletronica.db', location: 'default' })
        .then((sqLite: SQLiteObject) => {
          this.dbInstance = sqLite;
          sqLite.executeSql(`CREATE TABLE IF NOT EXISTS vote (vote_id INTEGER PRIMARY KEY, votestr TEXT)`, [])
            .catch((error) => alert(error));
          sqLite.executeSql(`CREATE TABLE IF NOT EXISTS candidate (candidate_id INTEGER PRIMARY KEY, numbercand TEXT, namecand TEXT, partycand TEXT)`, [])
            .catch((error) => alert(error));
        })
        .catch((error) => alert(error));
    });
  }

  public addVote(v) {
    if (String(v).length != 3) {
      alert('O voto deve conter 3 dígitos.');
      return;
    }
    this.dbInstance.executeSql(`INSERT INTO vote (votestr) VALUES ('${v}')`, [])
      .then(() => { alert("Voto confirmado."); }, (e) => { alert(JSON.stringify(e.err)); });
  }

  getAllVotes(): Array<VoteResult> {
    let voteResults: Array<VoteResult> = [];

    this.dbInstance.executeSql(`SELECT votestr, COUNT(*) AS qtd FROM vote WHERE votestr IN (SELECT numbercand from candidate)  GROUP BY votestr ORDER BY qtd desc`, []).then((res) => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          voteResults.push(new VoteResult(res.rows.item(i).votestr, res.rows.item(i).qtd));
        }
      }
    }, (e) => {
      alert(JSON.stringify(e));
    });

    return voteResults;
  }


  public addCandidate(numberCand, nameCand, partyCand){
    let valid: boolean = this.validate(numberCand, nameCand, partyCand);

    if (!valid){
      return
    }

    // this.dbInstance.executeSql(`SELECT numbercand FROM candidate WHERE numbercand = '${numberCand}'`, []).then((res) => {
    //   this.nRows = res.rows.length;
    //   alert(this.nRows);
    // }, (e) => {
    //   alert(JSON.stringify(e));
    // });

    // if (this.nRows > 0) {
    //   alert('O Número do Candidato já está em uso.');
    //   return;
    // }

    this.dbInstance.executeSql(`INSERT INTO candidate (numbercand, namecand, partycand) VALUES ('${numberCand}', '${nameCand}', '${partyCand}')`, [])
      .then(() => {
        alert("Candidato cadastrado com sucesso.");
      }, (e) => { alert(JSON.stringify(e.err)); });

    // this.dbInstance.executeSql(`SELECT numbercand FROM candidate WHERE numbercand = '${numberCand}'`, []).then((res) => {
    //   if (res.rows.length == 0) {
    //     this.dbInstance.executeSql(`INSERT INTO candidate (numbercand, namecand, partycand) VALUES ('${numberCand}', '${nameCand}', '${partyCand}')`, [])
    //       .then(() => {
    //         alert("Candidato cadastrado com sucesso.");
    //       }, (e) => { alert(JSON.stringify(e.err)); });
    //   } else {
    //     alert('O Número do Candidato já está em uso.');
    //   }
    // }, (e) => {
    //   alert(JSON.stringify(e));
    // });
  }

  getCandidate(candidate_id: number): Promise<any> {
    return this.dbInstance.executeSql(`SELECT * FROM candidate WHERE candidate_id = ${candidate_id}`, []).then((res) => {
      return {
        candidate_id: res.rows.item(0).candidate_id,
        numberCand: res.rows.item(0).numbercand,
        nameCand: res.rows.item(0).namecand,
        partyCand: res.rows.item(0).partycand
      }
    }, (e) => { alert(JSON.stringify(e)); });
  }

  getCandidateInfo(numberCand: string): Promise<any> {
    return this.dbInstance.executeSql(`SELECT * FROM candidate WHERE numbercand = ${numberCand}`, []).then((res) => {
      return {
        nameCand: res.rows.item(0).namecand,
        partyCand: res.rows.item(0).partycand
      }
    }, (e) => { alert(JSON.stringify(e)); });
  }

  setCandidate(candidate_id, numberCand, nameCand, partyCand) {
    let valid: boolean = this.validate(numberCand, nameCand, partyCand);

    if (!valid){
      return
    }

    this.dbInstance.executeSql(`UPDATE candidate SET numbercand = '${numberCand}', namecand = '${nameCand}', partycand = '${partyCand}' WHERE  candidate_id = ${candidate_id}`, []).then((res) => {
      alert('Atualizado com sucesso.');
    }, (e) => { alert(JSON.stringify(e)); });
  }

  getAllCandidate(): Array<Candidate> {
    let candidateList: Array<Candidate> = [];

    this.dbInstance.executeSql(`SELECT * FROM candidate`, []).then((res) => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          candidateList.push(new Candidate(res.rows.item(i).candidate_id, res.rows.item(i).numbercand, res.rows.item(i).namecand, res.rows.item(i).partycand));
        }
      }
    }, (e) => {
      alert(JSON.stringify(e));
    });

    return candidateList;
  }

  deleteCandidate(candidate_id) {
    this.dbInstance.executeSql(`DELETE FROM candidate WHERE candidate_id = ${candidate_id}`, []).then(() => {
      alert("Candidato excluído.");
    })
      .catch(e => {
        alert(JSON.stringify(e))
      });
  }

  validate(num, name, party): boolean {
    if (String(num).length != 3) {
      alert('O Número do Candidato deve conter 3 dígitos.');
      return false;
    } else if (String(name).length == 0) {
      alert('O Nome do Candidato deve ser preenchido.');
      return false;
    } else if (String(party).length == 0) {
      alert('O Partido do Candidato deve ser preenchido.');
      return false;
    }
    return true
  }
}

class VoteResult {
  voteStr: String;
  count: number;

  constructor(v: string, c: number) {
    this.voteStr = v;
    this.count = c;
  }
}

class Candidate {
  candidate_id: number;
  numberCand: string;
  nameCand: string;
  partyCand: string;

  constructor(c_id: number, numberC: string, nameC: string, partyC: string) {
    this.candidate_id = c_id
    this.numberCand = numberC;
    this.nameCand = nameC;
    this.partyCand = partyC;
  }
}