import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient } from '@angular/common/http';

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

    this.http.post( 'http://localhost:3000/datasets/upload_dataset', uploadData, 
      { 
        withCredentials: true,
        reportProgress: true,
        observe: 'events'
      }).pipe(
        map(event =&gt; this.getEventMessage(event, formData)),
        catchError(this.handleError)
      )
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (error) => console.log(error),
        () => {
          this.loadingPage.close();
          this.datasetFile = '';
          console.log('upload finished!');
        }
      );

  }

}
