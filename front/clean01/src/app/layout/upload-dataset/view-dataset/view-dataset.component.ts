import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { LoadDatasetService } from '../../shared/load-dataset.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Operation } from '../shared/operation.model';

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

  public cleaningActions: Array<any> = [];

  public specificDate: any = {
    year: '',
    month: '',
    day: ''
  }

  public specificValue: any = '';

  public specificDateModal: any;

  public operations: any = {};

  public columnOperationsModal: any;

  public viewOperations: Array<any> = [];


  constructor( private viewDatasetService: LoadDatasetService,
                private modalService: NgbModal ) { }

  ngOnInit() {
    this.onViewDataset();

    if ( this.operations.length > 0 )
    {
      for (var i=0; i < this.operations.length; i++) {
        if (this.operations[i].operation_type === 'filling_blank' && this.operations[i].operation_column === this.selectedColumn) {
          this.specificValue = this.operations[i].operation_value;
        }
      }
    }
  }


  onViewDataset() {
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


  onDeleteColumn() {
    if ( !this.operations[this.selectedColumn] )
    {
      this.operations[this.selectedColumn] = [];
      let op1 = new Operation('delete_column', this.dataset, this.selectedColumn, this.selectedColumn, 'new');
      this.operations[this.selectedColumn].push(op1);
    }
    else
    {
      let flag = false;
      for (var i=0; i < this.operations[this.selectedColumn].length; i++) {
        if (this.operations[this.selectedColumn][i].operation_type === 'delete_column') {
          this.operations[this.selectedColumn][i].operation_value = this.selectedColumn;
          flag = true;
        }
      }

      if ( !flag )
      {
        let op1 = new Operation('delete_column', this.dataset, this.selectedColumn, this.selectedColumn, 'new');
        this.operations[this.selectedColumn].push(op1);
      }
    }
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
    this.columnOperationsModal = this.modalService.open(columnOperationsModal, { size: 'lg', backdrop: 'static' });

    if ( this.operations[this.selectedColumn] )
    {
      for (var i=0; i < this.operations[this.selectedColumn].length; i++) {
        if (this.operations[this.selectedColumn][i].operation_type === 'filling_blank') {
          this.specificValue = this.operations[this.selectedColumn][i].operation_value.year + '-' + this.operations[this.selectedColumn][i].operation_value.month + '-' + this.operations[this.selectedColumn][i].operation_value.day;
          return;
        }
      }
    }
    
    this.specificValue = '';
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
    if ( !this.operations[this.selectedColumn] )
    {
      this.operations[this.selectedColumn] = [];
      let op1 = new Operation('change_data_type', this.dataset, this.selectedColumn, 'date', 'new');
      this.operations[this.selectedColumn].push(op1);
    }
    else
    {
      let flag = false;
      for (var i=0; i < this.operations[this.selectedColumn].length; i++) {
        if (this.operations[this.selectedColumn][i].operation_type === 'change_data_type') {
          this.operations[this.selectedColumn][i].operation_value = 'date';
          flag = true;
        }
      }

      if ( !flag )
      {
        let op1 = new Operation('change_data_type', this.dataset, this.selectedColumn, 'date', 'new');
        this.operations[this.selectedColumn].push(op1);
      }
    }
  }


  onFillSpecificValue(specificValueModal) {
    if ( this.operations[this.selectedColumn] )
    {
      for (var i=0; i < this.operations[this.selectedColumn].length; i++) {
        if (this.operations[this.selectedColumn][i].operation_type === 'filling_blank') {
          this.specificValue = this.operations[this.selectedColumn][i].operation_value.year + '-' + this.operations[this.selectedColumn][i].operation_value.month + '-' + this.operations[this.selectedColumn][i].operation_value.day;
          this.specificDateModal = this.modalService.open(specificValueModal, { size: 'lg', backdrop: 'static' });
          return;
        }
      }
    }
    
    this.specificValue = '';
    this.specificDateModal = this.modalService.open(specificValueModal, { size: 'lg', backdrop: 'static' });
  }


  onSaveSpecificValue(date: any) {
    this.specificDateModal.close();
  }


  onSelectSpecificDate(date: any) {
    if ( !this.operations[this.selectedColumn] )
    {
      this.operations[this.selectedColumn] = [];
      let op1 = new Operation('filling_blank', this.dataset, this.selectedColumn, date, 'new');
      this.operations[this.selectedColumn].push(op1);
      this.specificValue = date.year + '-' + date.month + '-' + date.day;
    }
    else
    {
      let flag = false;
      for (var i=0; i < this.operations[this.selectedColumn].length; i++) {
        if (this.operations[this.selectedColumn][i].operation_type === 'filling_blank') {
          this.operations[this.selectedColumn][i].operation_value = date;
          this.specificValue = date.year + '-' + date.month + '-' + date.day;
          flag = true;
        }
      }

      if ( !flag )
      {
        let op1 = new Operation('filling_blank', this.dataset, this.selectedColumn, date, 'new');
        this.operations[this.selectedColumn].push(op1);
        this.specificValue = date.year + '-' + date.month + '-' + date.day;
      }
    }

    console.log(this.operations);
  }


  saveOperations() {
    this.columnOperationsModal.close();
  }


  onApplyOperations() {
    this.viewDatasetService.applyOperations( this.operations ).subscribe(
      (data: any) => {
        for (let col in this.operations) {
          for ( let i=0; i<this.operations[col].length; i++ )
          {
            if ( this.operations[col][i]['operation_status'] == 'new' )
              this.operations[col][i]['operation_status'] = 'applied';
          }
        }

        this.onViewDataset();
      },
      (error) => console.log(error),
      () => console.log('Operations Applied...')
    );
  }


  onViewOperations(viewOperationsModal) {
    this.modalService.open(viewOperationsModal, { size: 'lg', backdrop: 'static' });
    this.buildViewOperations();
  }


  buildViewOperations() {
    this.viewOperations = [];

    for ( let oo in this.operations )
    {
      this.viewOperations.push(...this.operations[oo]);
    }
  }


  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  isDate(val) {
    return ( val.constructor.name === 'NgbDate' ) ? true : false;
  }


  applySingleOperation(op) {
    console.log(op);
  }
  
  deleteSingleOperation(op) {
    for ( let oo in this.operations )
    {
      for ( let i=0; i<this.operations[oo].length; i++)
      {
        if ( this.operations[oo][i] == op )
        {
          this.operations[oo].splice(i, 1);
        }
      }
    }

    this.buildViewOperations();
  }

}
