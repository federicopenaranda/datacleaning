import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-upload-dataset',
  templateUrl: './upload-dataset.component.html',
  styleUrls: ['./upload-dataset.component.scss'],
  animations: [routerTransition()]
})
export class UploadDatasetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
