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
  geocoder: any;

  constructor(private http: HttpClient, private el: ElementRef) {}

  ngOnInit() {
    loadjs('//dapi.kakao.com/v2/maps/sdk.js?appkey=06baf7c70082539cba96fe0b9ca385c9&libraries=services', this.handleMap)
  }

  handleMap = () => {
    this.daum = window['daum']
    const options = {
      center: new (window as any).daum.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new (window as any).daum.maps.Map(this.el.nativeElement.firstChild, options);

    var markerPosition = new (window as any).daum.maps.LatLng(33.450701, 126.570667);

    // 마커를 생성합니다
    var marker = new (window as any).daum.maps.Marker({
      position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);


    this.geocoder = new (window as any).daum.maps.services.Geocoder();
    let imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (let i = 0; i < matzipList.length; i++) {
      
      this.geocoder.addressSearch(matzipList[i].address, function (result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === (window as any).daum.maps.services.Status.OK) {

          let coords = new (window as any).daum.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          let imageSize = new (window as any).daum.maps.Size(24, 35);
          
          let markerImage = new (window as any).daum.maps.MarkerImage(imageSrc, imageSize);

          new (window as any).daum.maps.Marker({
            map: map,
            position: coords,
            title: matzipList[i].name,
            image: markerImage
          });
        }
      });
    }

    console.log('hellod');
    }
      
}
