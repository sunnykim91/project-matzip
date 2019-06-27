import {
  Component, OnInit, Input,
  ElementRef,
  } from '@angular/core';
  import {HttpClient} from '@angular/common/http';
  import loadjs from 'loadjs';

import { Matzips } from '../../matzips.interface'
import { matzipList } from '../../matzip-data'


  declare var daum: any

@Component({
  selector: 'app-map',
  template: `
    <div id="map">{{container}}</div>
  `,
  styles: [`
     #map {
       width: 1000px;
       height: 600px;
     }
  `]
})
export class MapComponent implements OnInit  {
  matzipList: Matzips[] = matzipList;
  container: any;
  daum: any

  constructor(private http: HttpClient, private el: ElementRef) {
    
  }
  ngOnInit() {
    loadjs('//dapi.kakao.com/v2/maps/sdk.js?appkey=06baf7c70082539cba96fe0b9ca385c9&libraries=services', this.handleMap)
  }

  handleMap = () => {
    this.daum = window['daum']
    console.log(daum)
    const options = {
      center: new (window as any).daum.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    new (window as any).daum.maps.Map(this.el.nativeElement.firstChild, options);
  }

  

}
