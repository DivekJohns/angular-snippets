import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { finalize } from 'rxjs/operators/finalize';
import { timeout } from 'rxjs/operators/timeout';
import { catchError } from 'rxjs/operators/catchError';
import { _throw } from 'rxjs/observable/throw';
import { retry } from 'rxjs/operators/retry';
import { of } from 'rxjs/observable/of';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  name = 'Angular 5';
  users = [];
 


  GetData() {


    this.http.get<any>("https://www.mocky.io/v2/5ab3558e2f00006000ca3677?mocky-delay=150ms&y=5")
      .pipe(timeout(1000),
      retry(3),
      catchError((e, c) => { return _throw(e) }),
      switchMap(f => { console.log('do something with '+JSON.stringify(f)); return of(f) }),
      finalize(() => { console.log('finilize') }))
      .subscribe(data => {
        console.log(data)
      }, err => {
        if (err.timeout) {
          console.log('in timeout error which is ->', err);
        }
        else {

          console.log(' error which is ->', err);

        }
      });
  }
  ClearData() {
        this.users = [];
      }

  constructor(private http: HttpClient) { }
  ngOnInit() { }

}
