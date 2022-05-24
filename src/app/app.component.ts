import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar} from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from './tabs/tabs.page'; 
import { DatabaseService } from './service/database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  constructor() {}
  
}
