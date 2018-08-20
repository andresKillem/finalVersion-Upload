import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core';
import {ImageInfoService} from '../image-info.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {ButtonLabelService} from '../button-label.service';
import {SimplePdfViewerComponent} from 'simple-pdf-viewer';
import {SimplePDFBookmark} from 'simple-pdf-viewer';

@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  backgroundUrl;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  btn1Label: string;
  btn2Label: string;
  btn3Label: string;
  btn4Label: string;
  identifier: string;
  fileIdentifier: string;
  contentFile: any = {};
  videoContent = false;
  imageContent = false;
  pdfContent = false;
  @ViewChild(SimplePdfViewerComponent) private pdfViewer: SimplePdfViewerComponent;
  bookmarks: SimplePDFBookmark[] = [];


  constructor(private imageInfoService: ImageInfoService, private buttonLabelService: ButtonLabelService, private sanitizer: DomSanitizer) {
    this.identifier = 'background';
    this.backgroundUrl = '';
  }

  ngOnInit() {
    this.getImageInfo(this.identifier);
    this.initAllButtons();
  }

  private initAllButtons() {
    this.initBtn1();
    this.initBtn2();
    this.initBtn3();
    this.initBtn4();
  }

  private initBtn1() {
    this.subscription1 = this.buttonLabelService.btn1Label
      .subscribe(label => this.btn1Label = label);
  }

  private initBtn2() {
    this.subscription2 = this.buttonLabelService.btn2Label
      .subscribe(label => this.btn2Label = label);
  }

  private initBtn3() {
    this.subscription3 = this.buttonLabelService.btn3Label
      .subscribe(label => this.btn3Label = label);
  }

  private initBtn4() {
    this.subscription4 = this.buttonLabelService.btn4Label
      .subscribe(label => this.btn4Label = label);
  }

  private getImageInfo(identifier: string) {
    this.imageInfoService.getFileInfo(identifier)
      .subscribe(imageInfo => {
        this.backgroundUrl = this.sanitizer.bypassSecurityTrustUrl(imageInfo.uri);
      });
  }

  public getContentFile(identifier: string) {
    this.fileIdentifier = identifier;
    this.imageInfoService.getFileInfo(identifier)
      .subscribe((imageInfo: any) => {
        if (imageInfo.uri) {
          this.contentFile = imageInfo;
          if (imageInfo.uri.search('.jpg') > 0) {
            this.imageContent = true;
            this.videoContent = false;
            this.pdfContent = false;
          }
          if (imageInfo.uri.search('.jpeg') > 0) {
            this.imageContent = true;
            this.videoContent = false;
            this.pdfContent = false;
          }
          if (imageInfo.uri.search('.mp4') > 0) {
            this.videoContent = true;
            this.imageContent = false;
            this.pdfContent = false;
          }
          if (imageInfo.uri.search('.mov') > 0) {
            this.videoContent = true;
            this.imageContent = false;
            this.pdfContent = false;
          }
          if (imageInfo.uri.search('.qt') > 0) {
            this.videoContent = true;
            this.imageContent = false;
            this.pdfContent = false;
          }
          if (imageInfo.uri.search('.pdf') > 0) {
            this.pdfContent = true;
            this.videoContent = false;
            this.imageContent = false;
            // this.contentFile.uri = this.sanitizer.bypassSecurityTrustResourceUrl(imageInfo.uri);
            console.log('This is the sanatized url: ' + this.contentFile.uri);
          }

        }
      });
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
  }

  // how to open PDF document
  openDocument(document: File) {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = () => {
      this.pdfViewer.openDocument(new Uint8Array(fileReader.result));
    };
    fileReader.readAsArrayBuffer(document);
  }

  // how to create bookmark
  createBookmark() {
    this.pdfViewer.createBookmark().then(bookmark => {
      if (bookmark) {
        this.bookmarks.push(bookmark);
      }
    });
  }
}
