import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isConnected: boolean = false;
  notConnected: boolean = true;

  status: any;

  //step
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;


  news: any;
  rightNow: any;
  then: any;

  filterDate: any;


  constructor(public navCtrl: NavController, private http: Http, private loadingCtrl: LoadingController,
    private iab: InAppBrowser) {

      let loading = this.loadingCtrl.create({
      });
      loading.present();
      this.http.get('http://localhost:8080/twitter').map(res => res.json())
        .subscribe(
          data => {
            this.news = data;
            console.log(this.news);
            var i;
            this.news.forEach(element => {
              this.calculator();
            });
            loading.dismiss();
          },
          Error => {
            
          }
        );



      setTimeout(() => {
        console.log("Methode POST : Timeout");
        loading.dismiss();

      }, 10000);


  }

  inapp(tweet) {
    let url = tweet.entities.urls["0"].expanded_url;
    const browser = this.iab.create(url);
  }

  calculator() {
    var i = 0;
    i++
    for (i < 49; i++;) {

      this.rightNow = new Date();
      this.then = new Date(this.news[i].created_at);

      var diff = this.rightNow - this.then;

      var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
      if (isNaN(diff) || diff < 0) {
        return this.filterDate = ""; // return blank string if unknown
      }
      if (diff < second * 2) {
        // within 2 seconds
        return this.filterDate = "maintenant";
      }
      if (diff < minute) {
        return this.filterDate = Math.floor(diff / second) + " il y a un instant";
      }
      if (diff < minute * 2) {
        return this.filterDate = "il y a environ 1 minute";
      }
      if (diff < hour) {
        return this.filterDate = "il y a " + Math.floor(diff / minute) + " minutes ";
      }
      if (diff < hour * 2) {
        return this.filterDate = "il y a environ 1 heure";
      }
      if (diff < day) {
        return this.filterDate = "il y a " + Math.floor(diff / hour) + " heure";
      }
      if (diff > day && diff < day * 2) {
        return this.filterDate = "hier";
      }
      if (diff < day * 365) {
        return this.filterDate = "il y a " + Math.floor(diff / day) + " jour";
      } else {
        return this.filterDate = "il ya plus d'un an";
      }


    }
  };

}
