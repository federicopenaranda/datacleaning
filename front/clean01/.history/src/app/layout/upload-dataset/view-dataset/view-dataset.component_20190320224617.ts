import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { LoadDatasetService } from '../../shared/load-dataset.service';

@Component({
  selector: 'app-view-dataset',
  templateUrl: './view-dataset.component.html',
  styleUrls: ['./view-dataset.component.scss'],
  animations: [routerTransition()]
})
export class ViewDatasetComponent implements OnInit {

  public dataset;
  public data;

  constructor( private viewDatasetService: LoadDatasetService ) { }

  ngOnInit() {
    this.viewDatasetService.loadDataset( this.viewDatasetService.getSelectedDataset() ).subscribe(
      (data) => {
        this.data = data;
      },
      (error) => console.log(error),
      () => console.log('Load Finished!')
    );
  }

}
