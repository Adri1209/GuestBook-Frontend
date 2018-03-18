import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

export interface UserEntries {
  Id: number;
  Name: string;
  Email: string;
  Date: string;
  Title: string;
  Content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  entries: UserEntries[];
  userEntry: UserEntries;
  errorMessage: string;

  constructor(private http: HttpClient) {
    this.userEntry = {
      Id: 0,
      Name: "",
      Email: '',
      Date: "",
      Title: "",
      Content: ""
    };
  }

  addEntry() {
    let date = new Date();
    let tempEntry = {Id: this.entries.length, Name: this.userEntry.Name , Email: this.userEntry.Email, Date: date.toLocaleDateString()+" - "+date.toLocaleTimeString(), Title: this.userEntry.Title, Content: this.userEntry.Content};
    let json = "{\"Id\":0,\"Name\":\"" + this.userEntry.Name + "\",\"Email\":\""+ this.userEntry.Email + "\",\"Date\":\"" + date.toLocaleDateString()+" - "+date.toLocaleTimeString() + "\",\"Title\":\"" + this.userEntry.Title + "\",\"Content\":\"" + this.userEntry.Content + "\"}";
    this.http.post('http://localhost:3000/guestbook', json
    ).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err.error.text);
      }
    );
    this.entries.push(tempEntry);
  }

  ngOnInit(): void {
    this.http.get<UserEntries[]>('http://localhost:3000/guestbook').subscribe(data => this.entries = data, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occurred.');
        this.errorMessage = 'Client-side error occurred.';
      } else {
        console.log('Server-side error occurred.');
        console.log(err.error.text);
        this.errorMessage = 'Server-side error occurred.';
      }
    });
  }
}
