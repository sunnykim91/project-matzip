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
    <app-nav [matzipList]="matzipList" [navStatus]="navStatus" (changeOpacity)="highOpacity()" (filterBroad)="filteredBroadcast($event)"></app-nav>
    <app-search (change)="changeArea($event)" [area]="area" [broadcastList]="broadcastList" [areaList]="areaList" [broadcast]="broadcast"></app-search>
  `,
  styles: [`
  #map {
       width: 1500px;
       height: 700px;
       margin: 0 auto;
     }
    
  `]
})

export class MainComponent implements OnInit {
  matzipList: Matzips[];
  areaList: Matzips[] = null;
  broadcastList: Matzips[] = null;
  area = '';
  broadcast = '';
  daum: any
  geocoder: any;
  map: any;
  imageSrc: any;

  areaMarkers = [];
  navStatus: boolean = false;

  constructor(private http: HttpClient, private el: ElementRef) { }

  ngOnInit() {
    loadjs('//dapi.kakao.com/v2/maps/sdk.js?appkey=06baf7c70082539cba96fe0b9ca385c9&libraries=services', this.handleMap)
    
  }


  changeArea(area: string) {
    this.area = area;
    this.areaList = matzipList.filter(matzip => matzip.address.includes(this.area));
    this.setMarker(this.map, this.imageSrc, this.areaList);
    this.broadcastList = null;
  }

  filteredBroadcast(broadcast: string) {
    this.broadcast = broadcast;
    this.broadcastList = matzipList.filter(matzip => matzip.broadcastingname.includes(this.broadcast));
    this.setMarker(this.map, this.imageSrc, this.broadcastList);
    this.areaList = null;
  }

  handleMap = () => {
    this.daum = window['daum']
  
    const options = {
      center: new (window as any).daum.maps.LatLng(33.450701, 126.570667),
      level: 13
    };
    this.map = new (window as any).daum.maps.Map(this.el.nativeElement.firstChild, options);
    navigator.geolocation.getCurrentPosition(function(pos) {
      let latitude = pos.coords.latitude;
      let longitude = pos.coords.longitude;
      let myPos = new (window as any).daum.maps.LatLng(latitude, longitude);
      this.map.setCenter(myPos);
      // 마커를 생성합니다
    let marker = new (window as any).daum.maps.Marker({
      position: myPos
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(this.map);
    }.bind(this));
    // let markerPosition = new (window as any).daum.maps.LatLng(33.450701, 126.570667);

    

    this.geocoder = new (window as any).daum.maps.services.Geocoder();
    // this.imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
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
          
          let markerImage = new (window as any).daum.maps.MarkerImage(
            imageSrc = matzipList[i].completed ? "../../assets/img/completemarker.png" : "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            imageSize);

          let marker = new (window as any).daum.maps.Marker({
            map: map,
            position: coords,
            title: matzipList[i].name,
            image: markerImage
          });
          let infowindow = new (window as any).daum.maps.InfoWindow({
            content: `
                      <div class="wrap">
                        <div class="info">
                            <div class="title">
                                ${matzipList[i].name}
                                <div class="close" onclick="closeOverlay()" title="닫기"></div>
                            </div>
                            <div class="body">
                                <div class="desc">
                                    <div class="ellipsis">${matzipList[i].address}</div>
                                    <a href="https://map.kakao.com/link/to/${matzipList[i].name},${result[0].y},${result[0].x}" style="color:blue" target="_blank">길찾기</a>
                                </div>
                            </div>
                        </div>
                    </div>
              `,
            removable: true
          });

          (window as any).daum.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));

          // (window as any).daum.maps.event.addListener(marker, 'click', function () {

          //   markerImage = new (window as any).daum.maps.MarkerImage(clickImageSrc, imageSize);
          //   marker.setImage(markerImage);

          // });

          function makeOverListener(map, marker, infowindow) {
            return function () {
              infowindow.open(map, marker);
            };
          }
          this.areaMarkers.push(marker);

        }
      }.bind(this));

    }

  }

  highOpacity() {
    this.navStatus = !this.navStatus;
  }
}