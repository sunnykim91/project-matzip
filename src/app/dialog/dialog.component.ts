import { Component, OnInit } from '@angular/core';

interface Page {
  id: number;
  date: string;
  name: string;
  address: string;
  photo: string;
  content: string;
}


@Component({
  selector: 'app-dialog',
  template: `
    <div class="input-container">
    <div class="diary-date"><span>날짜:</span><input type="date" class="currentDate" [value]='nowDate' #input1></div>
    <div class="diary-name"><span>이름:</span><input type="input" class="diaryName" #input2></div>
    <div class="diary-address"><span>주소:</span><input type="input" class="diaryAddress" #input3></div>
    <div class="diary-write">
        <span>내용:</span><textarea class="diaryWrite" rows = '15' cols = '130' autofocus #input4></textarea>
    </div>
    <div class="diary-photo">
        <img id="preview" width="300" alt="로컬에 있는 이미지가 보여지는 영역" [src]="previewImg">
        <br>
        <input type="file" class="getfile" accept="image/*" (change)="loadImg(files)" #files>
    </div>
    <button class="saveButton" (click)="saveData(input1.value, input2.value, input3.value, input4.value)">저장</button>
    </div>

    <div class= "showing-container">
    <ul class="diary-container">
      <li *ngFor="let page of pages" id= "{{page.id}}">
        <span>{{page.date}}, {{page.name}}, {{page.address}}</span>
        <div><img src='{{page.photo}}'></div>
        <p>{{page.content}}</p>
        <button class="removeButton" (click) = "deleteData(page.id)">X</button>
      </li>
    </ul>
    </div>

  `,
  styles: [`
  .input-container {
    background-color: rgba(255,255,255,0.5);
    background: url("./assets/img/background.jpg") no-repeat center 100%;
    margin-top: 100px;
    background-size: 100%;
}

div {
    margin: 10px;
    word-wrap: break-word;
}

span {
    width: 60px;
    display: inline-block;
}

li>span {
    width: 100%;
}

li {
    list-style: none;
}


.diaryName, .diaryAddress {
    width: 400px;
}

.diary-write {
    display: flex;
    align-items: center;
}

.diaryWrite {
    /* height: 50px;
    width: 150px; */
    resize: none;
    word-wrap: break-word;
}

.diary-photo {
    margin-top: 20px;
    margin-left: 70px;
    display: inline-block;
}

  `]
})
export class DialogComponent {
  pages: Page[] = [];
  nowDate = new Date().toISOString().substring(0, 10);
  pageCotent = '';
  imageList = [];
  previewImg: string | any = '../../assets/01_food.png';

  constructor() {
   }

   generateId() {
    return this.pages.length ? Math.max(...this.pages.map(page => page.id)) + 1 : 1;
   }


   loadImg(file: any) {
     const fileList = file.files;
     const reader = new FileReader();
     reader.readAsDataURL(fileList [0]);

     reader.onload = () => {
      console.log(reader.result);
      this.previewImg = reader.result ;
      this.imageList[this.generateId()] = reader.result;
     }

   }


   saveData(val1: string, val2: string, val3: string, val4: string) {
     const photoData = this.imageList[this.generateId()];
      // tslint:disable-next-line: max-line-length
     this.pages = [{id: this.generateId(), date: val1, name: val2, address: val3, photo: photoData, content: val4}, ...this.pages];
     }



    deleteData(id: number) {
      const deleteId = id;
      this.pages = this.pages.filter(page => page.id !== deleteId * 1);
      this.imageList[deleteId] = '';
  }


   }
