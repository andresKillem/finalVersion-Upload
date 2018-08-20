import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { FileUploadModule } from 'ng2-file-upload';
import { settingsReducer } from './settings.reducer';
import { SettingsEffects } from './settings.effects';
import { SettingsComponent } from './settings/settings.component';
import {ImageInfoService} from '@app/image-info.service';
import {ButtonLabelService} from '@app/button-label.service';


@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forFeature([SettingsEffects]),
    FileUploadModule
  ],
  declarations: [SettingsComponent],
  providers: [ImageInfoService, ButtonLabelService]
})
export class SettingsModule {}
