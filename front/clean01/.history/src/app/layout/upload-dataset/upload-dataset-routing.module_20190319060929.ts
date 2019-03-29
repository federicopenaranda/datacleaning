import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadDatasetComponent } from './upload-dataset.component';
import { LoadDatasetComponent } from './load-dataset/load-dataset.component';

const routes: Routes = [
  {
      path: '', component: UploadDatasetComponent
  },
  {
      path: 'load-dataset', component: LoadDatasetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadDatasetRoutingModule { }
