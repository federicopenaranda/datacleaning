import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UploadDatasetRoutingModule } from './upload-dataset-routing.module';
import { UploadDatasetComponent } from './upload-dataset/upload-dataset.component';

@NgModule({
  imports: [
    CommonModule,
    UploadDatasetRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [UploadDatasetComponent]
})
export class UploadDatasetModule { }
