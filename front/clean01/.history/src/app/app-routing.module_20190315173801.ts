import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', loadChildren: './layout/layout.module#LayoutModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
  { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
  { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
  { path: 'upload-dataset', loadChildren: './upload_dataset/upload-dataset.module#UploadDatasetModule' },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
