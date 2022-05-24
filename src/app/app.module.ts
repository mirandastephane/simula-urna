import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { DatabaseService } from './service/database/database.service';
import { CandidatoService } from './service/candidato/candidato.service';
import { PartidoService } from './service/partido/partido.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    DatabaseService,
    CandidatoService,
    PartidoService,
    {provide : LOCALE_ID, useValue: 'pt-BR'},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
