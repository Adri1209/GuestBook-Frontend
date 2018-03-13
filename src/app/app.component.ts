import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

export interface UserEntries {
  Id: number;
  Email: string;
  Title: string;
  Content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  entries: UserEntries[];
  dummyEntry: UserEntries;

  constructor(private http: HttpClient) {
    this.dummyEntry = {
      Id: 0,
      Email: '',
      Title: '',
      Content: ''
    }
  }

  addEntry() {
    this.entries.push(this.dummyEntry)
    var json = '{\"Id\":0,\"Email\":\"'+ this.dummyEntry.Email + '\",\"Title\":\"' + this.dummyEntry.Title + '\",\"Content\":\"' + this.dummyEntry.Content + '\"}';
    this.http.post('http://localhost:3000/guestbook', json
    ).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/guestbook').subscribe(data => console.log(data));
    this.http.get<UserEntries[]>('http://localhost:3000/guestbook').subscribe(data => this.entries = data, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    });
  }
}
