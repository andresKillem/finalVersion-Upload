import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {FileUploader} from 'ng2-file-upload';
import {ImageInfoService} from '@app/image-info.service';
import {ButtonLabelService} from '@app/button-label.service';


import {
  selectorSettings,
  ActionSettingsChangeTheme,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAnimationsElements,
  SettingsState,
  ActionSettingsPersist
} from '../settings.reducer';




@Component({
  selector: 'anms-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  settings: SettingsState;

  themes = [
    { value: 'DEFAULT-THEME', label: 'blue' },
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  languages = [
    { value: 'en', label: 'en' },
    { value: 'de', label: 'de' },
    { value: 'sk', label: 'sk' }
  ];
  // Migration 1
  host: string;
  baseUrl: string;
  backgroundUploader: FileUploader;
  btnFileUploader1: FileUploader;
  btnFileUploader2: FileUploader;
  btnFileUploader3: FileUploader;
  btnFileUploader4: FileUploader;
  hasBaseDropZoneOver: boolean;
  identifier: string;
  previewImageUrl: string;
  btn1Label: string;
  btn2Label: string;
  btn3Label: string;
  btn4Label: string;
  constructor(private store: Store<{}>, private imageInfoService: ImageInfoService, private buttonLabelService: ButtonLabelService) {
    store
      .pipe(select(selectorSettings), takeUntil(this.unsubscribe$))
      .subscribe(settings => (this.settings = settings));

    this.host = 'http://finalversion.us-west-2.elasticbeanstalk.com';
    this.baseUrl = `${this.host}/contentFile`;

    this.backgroundUploader = new FileUploader({
      url: this.baseUrl, additionalParameter: {
        'identifier': 'background',
        'projectId': '1'
      }
    });
    this.btnFileUploader1 = new FileUploader({
      url: this.baseUrl, additionalParameter: {
        'identifier': 'file1',
        'projectId': '1'
      }
    });
    this.btnFileUploader2 = new FileUploader({
      url: this.baseUrl, additionalParameter: {
        'identifier': 'file2',
        'projectId': '1'
      }
    });
    this.btnFileUploader3 = new FileUploader({
      url: this.baseUrl, additionalParameter: {
        'identifier': 'file3',
        'projectId': '1'
      }
    });
    this.btnFileUploader4 = new FileUploader({
      url: this.baseUrl, additionalParameter: {
        'identifier': 'file4',
        'projectId': '1'
      }
    });
    this.hasBaseDropZoneOver = false;

    this.previewImageUrl = '';
    this.identifier = 'background';
  }

  ngOnInit() {
    this.getImageInfo('background');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new ActionSettingsChangeTheme({ theme }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onAutoNightModeToggle({ checked: autoNightMode }) {
    this.store.dispatch(
      new ActionSettingsChangeAutoNightMode({ autoNightMode })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onPageAnimationsToggle({ checked: pageAnimations }) {
    this.store.dispatch(
      new ActionSettingsChangeAnimationsPage({ pageAnimations })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  onElementsAnimationsToggle({ checked: elementsAnimations }) {
    this.store.dispatch(
      new ActionSettingsChangeAnimationsElements({ elementsAnimations })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }


  getImageInfo(identifier: string) {
    this.imageInfoService.getFileInfo(identifier)
      .subscribe(imageInfo => {
        this.previewImageUrl = imageInfo.uri;
        if (this.previewImageUrl === undefined || this.previewImageUrl == null){
          this.previewImageUrl = '../../../assets/default.jpeg';
        }
      });
  }

  uploadBackground() {
    this.backgroundUploader.uploadAll();
    this.previewImageUrl = '';
    this.backgroundUploader.onCompleteAll = () => this.getImageInfo(this.identifier);
  }

  clearBackgroundFileQueue() {
    this.backgroundUploader.clearQueue();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    if (this.hasBaseDropZoneOver) {
      this.clearBackgroundFileQueue();
    }
  }

  updateButtonLabel(btn: string, btnLabel: string) {
    this.buttonLabelService.updateButtonLabel(btn, btnLabel);
  }
}
