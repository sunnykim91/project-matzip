import {
  Component, OnInit, Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import loadjs from 'loadjs';

import { Matzips } from '../matzips.interface'
import { matzipList } from '../matzip-data'


@Component({
  selector: 'app-main',
  template: `
    <div id="map">{{container}}</div>
    <app-nav></app-nav>
    <app-search></app-search>
  `,
  styles: [`
  #map {
       width: 1000px;
       height: 600px;
     }
    
  `]
})
export class MainComponent implements OnInit, AfterViewInit {

  matzipList: Matzips[] = matzipList;
  container: any;
  daum: any
  geocoder: any;
  
  @ViewChild('close', {static: true}) closeInfo: ElementRef;

  constructor(private http: HttpClient, private el: ElementRef) { }

  ngOnInit() {
    loadjs('//dapi.kakao.com/v2/maps/sdk.js?appkey=06baf7c70082539cba96fe0b9ca385c9&libraries=services', this.handleMap)
    
  }

  ngAfterViewInit(): void {
    console.log(this.closeInfo);
    
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
    let clickImageSrc = "../../assets/img/completemarker.png"

    for (let i = 0, len = matzipList.length; i < len; i++) {

      this.geocoder.addressSearch(matzipList[i].address, function (result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === (window as any).daum.maps.services.Status.OK) {

          let coords = new (window as any).daum.maps.LatLng(result[0].y, result[0].x);
          let onflag = true;
          // 결과값으로 받은 위치를 마커로 표시합니다
          let imageSize = new (window as any).daum.maps.Size(24, 35);

          let markerImage = new (window as any).daum.maps.MarkerImage(imageSrc, imageSize);

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
              `
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
            
          function closeOverlay() {
            
              // infowindow.close();
          }

        
        }

        

      });
      
    }
  }
}
