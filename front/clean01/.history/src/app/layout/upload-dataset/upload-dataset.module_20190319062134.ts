import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UploadDatasetRoutingModule } from './upload-dataset-routing.module';
import { UploadDatasetComponent } from './upload-dataset.component';
import { PageHeaderModule } from './../../shared';
import { LoadDatasetComponent } from './load-dataset/load-dataset.component';

@NgModule({
  imports: [
    CommonModule,
    UploadDatasetRoutingModule,
    PageHeaderModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  declarations: [UploadDatasetComponent, LoadDatasetComponent]
})
export class UploadDatasetModule { }
