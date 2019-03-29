import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UploadDatasetRoutingModule } from './upload-dataset-routing.module';
import { UploadDatasetComponent } from './upload-dataset.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule,
    UploadDatasetRoutingModule,
    PageHeaderModule,
    FormsModule
  ],
  declarations: [UploadDatasetComponent]
})
export class UploadDatasetModule { }
