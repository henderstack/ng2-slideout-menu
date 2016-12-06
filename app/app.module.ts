/**
 * Created by Bryan Henderson on 11/30/2016.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotificationService } from "./shared/index";
import { NotificationComponent } from "./notification/index";
import {NotificationPanelComponent} from "./notification-panel/index";

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ AppComponent, NotificationComponent, NotificationPanelComponent],
    bootstrap: [ AppComponent ],
    providers: [NotificationService]
})

export class AppModule {}