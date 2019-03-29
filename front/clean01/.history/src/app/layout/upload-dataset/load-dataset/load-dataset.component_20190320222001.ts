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

  public datasets;

  constructor( private loadDatasetService: LoadDatasetService ) { }

  ngOnInit() {
    this.loadDatasetService.getDatasets().subscribe(
      (data) => {
        this.datasets = data;
      },
      (error) => console.log(error),
      () => console.log('Load Finished!')
    );
  }

  activateDataset(dataset: any) {
    console.log(dataset.name);
    this.loadDatasetService.setSelectedDataset(dataset.name);
  }

}
