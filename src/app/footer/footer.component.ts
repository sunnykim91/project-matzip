import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="footer">
    <div class="slogan">최고의 맛집만을 제공하는 프리미엄 맛집일기 플랫폼 맛있정</div>
  </div>
  `,
  styles: [`
    .footer {
      position: relative;
      margin: 0 auto;
      width: 1500px;
    }
    
    .develop {
      display: inline-block;
      margin-left: 2em;
      list-style-type: none;
    }

    .slogan {
      font-family: 'Chosunilbo_myungjo';
      font-size: 30px;
      width: 800px;
      margin: 0 auto;
      text-align: center;
      font-weight: bold;
    }
  `]
})
export class FooterComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

}
