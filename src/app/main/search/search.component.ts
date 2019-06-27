import { Component, OnInit } from '@angular/core';
import { Matzips } from '../../matzips.interface'
import { matzipList } from '../../matzip-data'

@Component({
  selector: 'app-search',
  template: `
    <div *ngFor="let list of matzipList">
      {{list.name}}
      {{list.menu}}
      {{list.address}}
    </div>
  `,
  styles: []
})
export class SearchComponent implements OnInit {
  matzipList: Matzips[] = matzipList;

  constructor() { }

  ngOnInit() {
  }

}
