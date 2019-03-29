import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { LoadDatasetService } from '../../shared/load-dataset.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  public selectedColumn: string = '';

  public datasetShape: Array<string>;
  public datasetDescription: Array<any> = [];

  public datasetMissing;

  public columnDescription: any;

  public cleaningActions: any;


  constructor( private viewDatasetService: LoadDatasetService,
                private modalService: NgbModal ) { }

  ngOnInit() {
    this.dataset = this.viewDatasetService.getSelectedDataset();

    this.viewDatasetService.viewDataset( this.dataset ).subscribe(
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

  
  onDatasetShape(datasetShapeModal) {
    this.modalService.open(datasetShapeModal, { size: 'lg', backdrop: 'static' });

    this.viewDatasetService.shapeDataset().subscribe(
      (data: any) => {
        let info = data.info;
        (info).toString();
        info = info.replace("<class 'pandas.core.frame.DataFrame'>\n", '');
        info = info.split('\n')

        let desc = JSON.parse(data.description);
        let missing = JSON.parse(data.missing);

        this.datasetMissing = missing;

        this.datasetDescription = [];
        this.columns.forEach(column => {
          this.datasetDescription.push(desc[column]);
        });

        this.datasetShape = info;
      },
      (error) => console.log(error),
      () => console.log('Shape Dataset!')
    );
  }


  onOtherColumnActions(columnOperationsModal, column) {
    this.selectedColumn = column;
    this.modalService.open(columnOperationsModal, { size: 'lg', backdrop: 'static' });
  }


  onInfoColumn(columnDescModal, column: string) {
    this.selectedColumn = column;

    this.viewDatasetService.infoColumn(column).subscribe(
      (data: any) => {
        let desc = JSON.parse(data.description)
        this.columnDescription = desc;
        this.modalService.open(columnDescModal, { size: 'lg', backdrop: 'static' });
      },
      (error) => console.log(error),
      () => console.log('Info Column Finished...')
    );
  }


  onChangeToDate() {
    this.viewDatasetService.changeColumnToDate(this.selectedColumn).subscribe(
      (data: any) => {
        let desc = JSON.parse(data.description)
        this.columnDescription = desc;
        this.modalService.open(columnDescModal, { size: 'lg', backdrop: 'static' });
      },
      (error) => console.log(error),
      () => console.log('Info Column Finished...')
    );
  }


}