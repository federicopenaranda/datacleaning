import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { LoadDatasetService } from '../../shared/load-dataset.service';

@Component({
  selector: 'app-load-dataset',
  templateUrl: './load-dataset.component.html',
  styleUrls: ['./load-dataset.component.scss'],
  animations: [routerTransition()]
})
export class LoadDatasetComponent implements OnInit {

  constructor( private loadDatasetService: LoadDatasetService ) { }

  ngOnInit() {
    this.loadDatasetService.getDatasets().subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => console.log('Load Finished!')
    );
  }

}
