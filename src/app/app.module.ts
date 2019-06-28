import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatzipComponent } from './matzip/matzip.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './main/nav/nav.component';
import { SearchComponent } from './main/search/search.component';
import { DialogComponent } from './dialog/dialog.component';
import { FooterComponent } from './footer/footer.component';
import { MatzipfilterPipe } from './matzipfilter.pipe';
import { FormsModule } from '@angular/forms';
import { BroadfilterPipe } from './broadfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MatzipComponent,
    HeaderComponent,
    MainComponent,
    NavComponent,
    SearchComponent,
    DialogComponent,
    FooterComponent,
    MatzipfilterPipe,
    BroadfilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
