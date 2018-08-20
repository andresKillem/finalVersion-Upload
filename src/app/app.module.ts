import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticatedComponent} from '@app/examples/authenticated/authenticated.component';
import { SimplePdfViewerModule } from 'simple-pdf-viewer';


@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,
    SettingsModule,
    SimplePdfViewerModule,
    // app
    AppRoutingModule

  ],
  declarations: [AppComponent, DashboardComponent, AuthenticatedComponent],
  providers: [SimplePdfViewerModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
