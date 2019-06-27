import { Component, OnInit } from '@angular/core';

import { Matzips } from '../../matzips.interface'
import { matzipList } from '../../matzip-data'

@Component({
  selector: 'app-search',
  template: `
  <div class="overlay">
    <label>지역별 검색 : 
      <input type="text" class="area-search" placeholder=" ex) 서울" 
      (keyup.enter)="changeArea(input.value)" #input>
    </label>
    <div class="matzipList" *ngFor="let matzip of matzipList | matzipfilter: area">
      <span class="matzipInfo"><strong>{{ matzip.name }}</strong></span>
      <span class="matzipInfo">{{ matzip.menu }}</span>
      <span class="matzipInfo">{{ matzip.address }}</span>
    </div>
  </div>
  `,
  styles: [`
  .overlay{
    position: absolute;
    top: 0;
    left: 3%;
    z-index: 777;
    background: rgba(255, 255, 255, 0.7);
    width: 300px;
    height: 85vh;
    margin-top: 15px;
    padding: 20px;
    text-align: center;
    overflow-y: scroll;
  }
  .area-search{
    width: 150px;
    height: 30px;
    border: none;
    padding: 5px;
    background: none;
  }
  .area-search:focus{
    outline: none;
  }
  .matzipList{
    text-align: right;
    margin-top: 20px;
    border-bottom: 1px solid grey;
    padding: 0 10px 15px 10px;
  }
  .matzipInfo{
    display: block;
    font-size: 13px;
  }
  `]
})
export class SearchComponent implements OnInit {
  matzipList: Matzips[] = matzipList;

  area = '';
  constructor() { 
  }

  ngOnInit() {
  }
  
  changeArea(area: string){
    this.area = area;
  }

}
