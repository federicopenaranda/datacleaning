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

  constructor( private modalService: NgbModal,
                private http: HttpClient ) { }

  ngOnInit() {
  }

  onFileChanged( file ) {
    this.selectedDriver = file.target.files[0];
    this.selectedDriverName = file.target.files[0].name;
  }


  onUploadDataset(loadingPage) {

    this.loadingPage = this.modalService.open(loadingPage, 
      { size: 'sm', backdrop: 'static', centered: true });
      

      const uploadData = new FormData();
      uploadData.append('datasetFile', this.selectedDriver, this.selectedDriver.name);
      
      this.http.post( 'http://localhost:3000/datasets/upload_dataset', uploadData, {
        withCredentials: true
      }).subscribe(
        (data: any) => {
          if ( data.success === "true" )
          {
            this.selectedDriverName = data.name;
            (this.editedConnectionId === 0) ? this.saveConnection() : this.updateConnection();
          }
          else {
            console.log('error uploading the driver.');
          }
        }
      );



  }
}
