import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqlProvider } from '../../providers/sql/sql';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dataArray:any = [];
  name; age;
  shoButtonClick = false;

  constructor(public navCtrl: NavController, private dbProvider:SqlProvider) {
    this.dbProvider.createDatabase();
  }

  callInsertMethod(name,age){
    this.dbProvider.insertData(name,age).then((res) => { this.callShowMethod();}).catch((err) => console.log(err));
  }

  callUpdateMethod(name,age){
    this.dbProvider.updateData(name,age).then((res) => { this.callShowMethod();}).catch((err) => console.log(err));
  }

  callDeleteMethod(name,age){
    this.dbProvider.deleteData(name,age).then((res) => { this.callShowMethod(); }).catch((err) => console.log(err));
  }

  callShowMethod(){
    this.dbProvider.getData().then((res:any) => { 
      this.shoButtonClick = true;
      this.dataArray = []; 
      for(let i = 0; i< res.rows.length ; i++){
        this.dataArray.push({"name": res.rows.item(i).name, "age" : res.rows.item(i).age})
      }
    }).catch((err) => console.log(err));
  }

  deleteAllMethod(){
    this.dbProvider.deleteAllRows().then((res) => { this.callShowMethod(); }).catch((err) => console.log(err));
  }
}
