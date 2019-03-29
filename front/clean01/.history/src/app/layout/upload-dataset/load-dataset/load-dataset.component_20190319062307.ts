import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-load-dataset',
  templateUrl: './load-dataset.component.html',
  styleUrls: ['./load-dataset.component.scss'],
  animations: [routerTransition()]
})
export class LoadDatasetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
