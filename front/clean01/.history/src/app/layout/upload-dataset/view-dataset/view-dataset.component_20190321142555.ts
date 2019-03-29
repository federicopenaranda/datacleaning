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

  public columns;
  public index;
  public data;

  constructor( private viewDatasetService: LoadDatasetService ) { }

  ngOnInit() {
    this.dataset = this.viewDatasetService.getSelectedDataset();

    this.viewDatasetService.loadDataset( this.dataset ).subscribe(
      (data: any) => {
        this.data = data.data;
        this.columns = data.columns;
        this.index = data.index;
      },
      (error) => console.log(error),
      () => console.log('Load Finished!')
    );
  }

  onDeleteColumn( column_name: string ) {
    this.viewDatasetService.deleteColumn(column_name).subscribe(
      (data: any) => {
        this.data = data.data;
        this.columns = data.columns;
        this.index = data.index;
      },
      (error) => console.log(error),
      () => console.log('Delete Column Finished!')
    );
  }

}
