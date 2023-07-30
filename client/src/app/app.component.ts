import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Dating app';
  users: any[] = []; // Initialize as an empty array
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:7089/api/users').subscribe({
      next: (response: any[]) => {
        this.users = response; // Assign the response data to the users property
      },
      error: () => console.log('error'),
      complete: () => console.log('Request has completed')
    });
  }

}
