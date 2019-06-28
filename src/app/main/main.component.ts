import {
  Component, OnInit,
  ElementRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import loadjs from 'loadjs';

import { Matzips } from '../matzips.interface'
import { matzipList } from '../matzip-data'


@Component({
  selector: 'app-main',
  template: `
    <div id="map"></div>
    <app-nav></app-nav>
    <app-search (change)="changeArea($event)"></app-search>
  `,
  styles: [`
  #map {
       width: 1000px;
       height: 600px;
     }
  `]
})
export class MainComponent implements OnInit {
  matzipList: Matzips[];
  areaList: Matzips[];
  broadcastList: Matzips[];
  area = '';
  broadcast = '';
  daum: any
  geocoder: any;
  map: any;
  imageSrc: any;

  areaMarkers = [];

  constructor(private http: HttpClient, private el: ElementRef) { }

  ngOnInit() {
    loadjs('//dapi.kakao.com/v2/maps/sdk.js?appkey=06baf7c70082539cba96fe0b9ca385c9&libraries=services', this.handleMap)
  }

  changeArea(area: string){
    this.area = area;
    this.areaList = matzipList.filter(matzip => matzip.address.includes(this.area));
    this.setMarker(this.map, this.imageSrc, this.areaList);
  }

   handleMap = () => {
    this.daum = window['daum']
    const options = {
      center: new (window as any).daum.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    this.map = new (window as any).daum.maps.Map(this.el.nativeElement.firstChild, options);

    let markerPosition = new (window as any).daum.maps.LatLng(33.450701, 126.570667);

    // 마커를 생성합니다
    let marker = new (window as any).daum.maps.Marker({
      position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(this.map);

    this.geocoder = new (window as any).daum.maps.services.Geocoder();
    this.imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    this.areaList = matzipList.filter(matzip => matzip.address.includes(this.area));
    this.setMarker(this.map, this.imageSrc, this.areaList);
  }

  setMarker(map, imageSrc, matzipList){     
    for (var i = 0; i < this.areaMarkers.length; i++) {
      this.areaMarkers[i].setMap(null);
    }  
    for (let i = 0; i < matzipList.length; i++) {

      this.geocoder.addressSearch(matzipList[i].address, function (result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === (window as any).daum.maps.services.Status.OK) {

          let coords = new (window as any).daum.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          let imageSize = new (window as any).daum.maps.Size(24, 35);

          let markerImage = new (window as any).daum.maps.MarkerImage(imageSrc, imageSize);

          let marker = new (window as any).daum.maps.Marker({
            map: map,
            position: coords,
            title: matzipList[i].name,
            image: markerImage
          });
          this.areaMarkers.push(marker);

        }
        
      }.bind(this));
      
    }
    
  }
  
}
