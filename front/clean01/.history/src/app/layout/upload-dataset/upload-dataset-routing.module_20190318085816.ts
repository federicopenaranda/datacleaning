import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadDatasetComponent } from './upload-dataset.component';

const routes: Routes = [
  {
      path: '', component: UploadDatasetComponent
  },
  {
      path: 'load-dataset', component: UploadDatasetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadDatasetRoutingModule { }
