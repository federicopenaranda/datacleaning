import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-dataset',
  templateUrl: './upload-dataset.component.html',
  styleUrls: ['./upload-dataset.component.scss'],
  animations: [routerTransition()]
})
export class UploadDatasetComponent implements OnInit {

  public selectedDataset: File;
  public selectedDatasetName: string = '';

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
    //uploadData.append('datasetFile', this.selectedDataset, this.selectedDataset.name);
    console.log(uploadData);

    /* this.http.post( 'http://localhost:3000/datasets/upload_dataset', uploadData, { withCredentials: true })
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (error) => console.log(error),
        () => console.log('upload finished!')
      ); */

  }

}
