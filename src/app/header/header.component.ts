import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
<<<<<<< HEAD
  <div class="header">
    <h1 class="logo">
      <a href="#">
        <img src="../assets/img/logo.jpg" alt="맛있정로고">
        <span class="title">마시쩡 더머겅</span>
      </a>
    </h1>
  </div>
`,
  styles: [`
    .logo {
      position: relative;
      margin: 0 auto;
      width: 800px;
      height: 150px;
    }
    .logo img {
      width: 150px;
      height: 150px;
    }
    .title {
      font-family: 'yg-jalnan';
      font weight: normal;
      font-size: 100px;
      position: absolute;
      right: 0;
      color: black;
    }
  `]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
