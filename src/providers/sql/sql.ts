import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlProvider {
  dbName: SQLiteObject;
  constructor(private sqlite: SQLite) {
    console.log('Hello SqlProvider Provider');
  }

  createDatabase() {   
      this.sqlite.create({
        name: 'Test.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.dbName = db;
        this.createTable();
      })
  }

  createTable() {
    return new Promise((resolve, reject) => {
      this.dbName.open().then((res) => {
        let query = "CREATE TABLE IF NOT EXISTS 'TESTINGDATA' (name text, age text)";;
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          console.log(err);
          reject(err);
        })
      });
    })    
  }

  insertData(name,age){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "INSERT INTO 'TESTINGDATA' (name, age) VALUES ('" + name + "'," + age + ")";;
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })   
  }

  getData(){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "SELECT * FROM 'TESTINGDATA'";;
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

  updateData(name,age){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "UPDATE 'TESTINGDATA' SET name='No name', age=19 WHERE name='" + name + "' and age =" + age;
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

  deleteData(name,age){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "DELETE FROM 'TESTINGDATA' WHERE name='" + name + "' and age=" + age ;
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

  deleteAllRows(){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "DELETE FROM 'TESTINGDATA'";
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

}
