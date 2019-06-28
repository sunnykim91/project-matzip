import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { navItems } from 'src/app/navitem.type';
import { matzipList } from 'src/app/matzip-data';
import { Matzips } from 'src/app/matzips.interface';

@Component({
  selector: 'app-nav',
  template: `
  <div class="nav-container" [class.active]="navStatus">
    <ul class="nav">
      <li *ngFor="let navItem of navItems" class="navList"><button (mouseover)="changeOpacity.emit()" (mouseleave)="changeOpacity.emit()" (click)="filterBroad.emit(navItem)">{{navItem}}</button></li>
    </ul>
  </div>
  `,
  styles: [`
    .nav-container {
      position: absolute;
      background: yellowgreen;
      opacity: 0.5;
      top: 159px;
      z-index: 1;
      border-radius: 20px;
      margin-left: 20%;
    }
    .nav-container.active {
      opacity: 1;
    }
    .navList {
      display: inline-block;
      list-style-type: none;
      cursor: pointer;
      margin-right: 40px;
    }
    .navList button {
      height: 50px;
      width: 150px;
      font-size: 15px;
      font-family: 'Binggrae-Bold';
      border: none;
      border-radius: 20px;
      background: white;
    }
  `]
})
export class NavComponent implements OnInit {
  @Input() navStatus: boolean;
  @Input() matzipList: Matzips[];
  @Output() changeOpacity = new EventEmitter();
  @Output() changeM = new EventEmitter();
  @Output() filterBroad = new EventEmitter();

  navItems: navItems[] = ['All', '영자로드', '수요미식회', '맛있는녀석들', '백종원의3대천왕']

  constructor() { }

  ngOnInit() {
  }
}
