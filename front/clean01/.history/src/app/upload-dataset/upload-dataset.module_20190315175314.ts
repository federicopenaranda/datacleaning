import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { UploadDatasetRoutingModule } from './upload-dataset-routing.module';
import { UploadDatasetComponent } from './upload-dataset/upload-dataset.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    UploadDatasetRoutingModule
  ],
  declarations: [UploadDatasetComponent]
})
export class UploadDatasetModule { }
