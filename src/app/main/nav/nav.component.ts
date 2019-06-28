import { Component, OnInit } from '@angular/core';
import { navitem } from 'src/app/type/navitem.type';

@Component({
  selector: 'app-nav',
  template: `
  <div class="nav-container">
    <ul class="nav">
      <li *ngFor="let navItem of navItems" class="navList">{{navItem}}</li>
    </ul>
  </div>
  `,
  styles: [`
    .nav-container {
      position: absolute;
      background: green;
      top: 159px;
      left: 20%;
      z-index: 1;
    }
    .navList {
      display: inline-block;
      margin-left: 2em;
      list-style-type: none;
      cursor: pointer;
    }
  `]
})
export class NavComponent implements OnInit {
  navItems: navitem[] = ['All', '영자로드', '수요미식회', '맛있는 녀석들', '백종원의 삼대천왕']

  constructor() { }

  ngOnInit() {
  }

}
