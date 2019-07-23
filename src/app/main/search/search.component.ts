import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Matzips } from '../../matzips.interface'
import { matzipList } from '../../matzip-data'

@Component({
  selector: 'app-search',
  template: `
  <div class="overlay">
    <label>지역별 검색 : 
      <input type="text" class="area-search" placeholder=" ex) 서울" 
      (keyup.enter)="changeArea(input)" #input>
    </label>

    <ng-container *ngIf="areaList">
      <div class="matzipList" *ngFor="let matzip of matzipList | matzipfilter: area">
      <img (click)="changeHeart()" class="heart" src="{{stateheartSrc}}">
        <img class="completed" src="../../../assets/img/completedimage.png">
        <span class="matzipInfo"><strong>{{ matzip.name }}</strong></span>
        <span class="matzipInfo">{{ matzip.menu }}</span>
        <span class="matzipInfo">{{ matzip.address }}</span>
      </div>
    </ng-container>

    <ng-container *ngIf="broadcastList">
      <div class="matzipList" *ngFor="let matzip of matzipList | broadfilter : broadcast">
      <img *ngIf="matzip.completed; else completed"
      src="../../assets/img/completemarker.png" class="marker">
      <ng-template #completed>
        <img src="http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png" class="marker">
      </ng-template>
        <img (click)="changeHeart()" class="heart" src="{{stateheartSrc}}">
        <img class="completed" src="../../../assets/img/completedimage.png">
        <span class="matzipInfo"><strong>{{ matzip.name }}</strong></span>
        <span class="matzipInfo">{{ matzip.menu }}</span>
        <span class="matzipInfo">{{ matzip.address }}</span>
      </div>
    </ng-container>

  
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
    position: relative;
  }
  .matzipInfo{
    display: block;
    font-size: 13px;
  }

  .marker{
    position: absolute;
    top: 0;
    left: 15px;
    width:35px;
    height: 50px;
  }

  .completed{
    width: 10%;
    height:10%;
  }
  .heart{
    width: 10%;
    height:10%;
    padding-right: 3%;

  }
  `]
})
export class SearchComponent implements OnInit {
  matzipList: Matzips[] = matzipList;
  @Output() change = new EventEmitter();

  @Input() area: string;
  @Input() broadcastList: Matzips[];
  @Input() areaList: Matzips[];
  @Input() broadcast: string;
  stateheartSrc: String;
  state = 'beforeheart';
  heartFlag = false;


  constructor() { 

  }

  ngOnInit() {
    this.stateheartSrc = `../../../assets/img/${this.state}.png`
  }
  changeHeart(){
    this.stateheartSrc = `../../../assets/img/afterheart.png`
  }
  

  changeArea(area: HTMLInputElement){
    if(area.value !== '') {
      this.change.emit(area.value);
      area.value = '';
    }

  }

}
