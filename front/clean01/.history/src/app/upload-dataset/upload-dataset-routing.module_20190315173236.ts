import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadDatasetComponent } from './upload-dataset/upload-dataset.component';

const routes: Routes = [
  {
    path: '', component: UploadDatasetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadDatasetRoutingModule { }
