import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpEvent } from '@angular/common/http';

import { NgbModal, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-upload-dataset',
  templateUrl: './upload-dataset.component.html',
  styleUrls: ['./upload-dataset.component.scss'],
  animations: [routerTransition()]
})
export class UploadDatasetComponent implements OnInit {

  public selectedDataset: File;
  public selectedDatasetName: string = '';

  public datasetFile = '';
  public uploadProgress = 0;

  public loadingPage: any;

  constructor( private modalService: NgbModal,
                private http: HttpClient ) { }

  ngOnInit() {
  }

  onFileChanged( file ) {
    this.selectedDataset = file.target.files[0];
    this.selectedDatasetName = file.target.files[0].name;
  }


  onUploadDataset(loadingPage) {

    this.loadingPage = this.modalService.open(loadingPage,
      {
        size: 'sm',
        backdrop: 'static',
        centered: true
      }
    );

    const uploadData: FormData = new FormData();
    uploadData.append('datasetFile', this.selectedDataset, this.selectedDataset.name);

    let request = this.http.post( 'http://localhost:3000/datasets/upload_dataset', uploadData, 
      { 
        withCredentials: true,
        reportProgress: true,
        observe: 'events'
      });


    request.subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.loaded);
        console.log(data.total);
      },
      (error) => console.log(error),
      () => {
        this.loadingPage.close();
        this.datasetFile = '';
        console.log('upload finished!');
      }
    );
      

  }



  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {

      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);

      case HttpEventType.Response:
        return this.apiResponse(event);

      default:
        return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

}
