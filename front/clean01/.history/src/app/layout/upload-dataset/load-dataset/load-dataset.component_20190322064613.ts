import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { LoadDatasetService } from '../../shared/load-dataset.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-load-dataset',
  templateUrl: './load-dataset.component.html',
  styleUrls: ['./load-dataset.component.scss'],
  animations: [routerTransition()]
})
export class LoadDatasetComponent implements OnInit {

  public datasets;

  public dataset;

  constructor( private loadDatasetService: LoadDatasetService,
                private modalService: NgbModal ) { }

  ngOnInit() {
    this.loadDatasetService.getDatasets().subscribe(
      (data) => {
        this.datasets = data;
      },
      (error) => console.log(error),
      () => console.log('Load Finished!')
    );
  }

  activateDataset(dataset: any, loadingForm: any) {
    let modal = this.modalService.open(loadingForm, { size: 'sm', backdrop: 'static' });

    this.loadDatasetService.setSelectedDataset(dataset.name);

    this.dataset = this.loadDatasetService.getSelectedDataset();

    this.loadDatasetService.loadDataset( this.dataset ).subscribe(
      (data: any) => console.log(data),
      (error) => console.log(error),
      () => {
        console.log('Load Finished!');
        modal.close();
      }
    );
  }

}
