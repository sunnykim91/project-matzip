import { Component, OnInit } from '@angular/core';
import { developersList } from '../type/developers.type';

@Component({
  selector: 'app-footer',
  template: `
  <div class="footer">
    <ul class="develop-list">
      <li *ngFor="let developer of developers" class="develop">{{developer}}</li>
    </ul>
    <div class="slogan">최고의 맛집만을 제공하는 프리미엄 맛집일기 플랫폼 맛있정</div>
  </div>
  `,
  styles: [`
    .footer {
      background: linear-gradient(to bottom, #eee, #ccc);
      position: relative;
      margin: 0 auto;
      width: 1000px;
    }
    
    .develop {
      display: inline-block;
      margin-left: 2em;
      list-style-type: none;
    }

    .slogan {
      font-family: 'Chosunilbo_myungjo';
      font-size: 20px;
      width: 700px;
      margin: 0 auto;
      text-align: center;
    }
  `]
})
export class FooterComponent implements OnInit {
  developers: developersList[] = ['김선휘', '황유순', '윤해서', '유진혁']
  
  constructor() { }

  ngOnInit() {
  }

}
