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

  public dataColumns = [];
  public dataColumnsTypes = [];
  public dataIndex = [];
  public data = [];

  public dataTypeCounts = [];

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



  public descriptiveStatistic: number;
  public descriptiveStatisticModal: any;

  // public operations: any = {};
  public operations2: Operation[] = [];

  public columnOperationsModal: any;

  public viewOperations: Array<any> = [];

  public replaceFloat: number;
  public replaceInt: number;
  public replaceBool: boolean;


  constructor( private viewDatasetService: LoadDatasetService,
                private modalService: NgbModal ) { }

  ngOnInit() {
    this.onViewDataset();

    // if ( this.operations.length > 0 )
    // {
    //   for (var i=0; i < this.operations.length; i++) {
    //     if (this.operations[i].operation_type === 'filling_blank' && this.operations[i].operation_column === this.selectedColumn) {
    //       this.specificValue = this.operations[i].operation_value;
    //     }
    //   }
    // }
  }


  onViewDataset() {
    this.dataset = this.viewDatasetService.getSelectedDataset();

    this.viewDatasetService.viewDataset( this.dataset ).subscribe(
      (data: any) => {
        if ( data )
        {
          this.data = data.data;
          this.dataColumns = data.columns;
          this.dataIndex = data.index;
        }
        else
        {
          this.data = [];
          this.dataColumns = [];
          this.dataIndex = [];
        }

        this.getColumnsTypes();
      },
      (error) => console.log(error),
      () => console.log('Load Finished!')
    );
  }


  onDeleteColumn() {
    let op1 = new Operation('delete_column', this.dataset, this.selectedColumn, this.selectedColumn, this.selectedColumn, 'new', '');
    let opRes = this.checkOperation(op1);

    if ( !opRes ) {
      return false;
    }
    else {
      this.operations2.push(op1);
      return true;
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
        this.dataColumns.forEach(column => {
          this.datasetDescription.push(desc[column]);
        });

        this.datasetShape = info;

        // Setting the datatype counts
        let dtc = JSON.parse(data.dtcounts);
        let ks = Object.keys(dtc);

        let dtCounts = [];

        ks.map( item => {
          dtCounts.push( { datatype: item, count: dtc[item] } )
        });

        this.dataTypeCounts = [];
        this.dataTypeCounts.push(...dtCounts);

      },
      (error) => console.log(error),
      () => console.log('Shape Dataset!')
    );
  }


  onOtherColumnActions(columnOperationsModal, column) {
    this.selectedColumn = column;
    this.columnOperationsModal = this.modalService.open(columnOperationsModal, { size: 'lg', backdrop: 'static' });

    // if ( this.operations[this.selectedColumn] )
    // {
    //   for (var i=0; i < this.operations[this.selectedColumn].length; i++) {
    //     if (this.operations[this.selectedColumn][i].operation_type === 'filling_blank') {
    //       this.specificValue = this.operations[this.selectedColumn][i].operation_value.year + '-' + this.operations[this.selectedColumn][i].operation_value.month + '-' + this.operations[this.selectedColumn][i].operation_value.day;
    //       return;
    //     }
    //   }
    // }
    
    // this.specificValue = '';
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


  onChangeType( newType: string, viewType: string ) {
    let op1 = new Operation('change_data_type', this.dataset, this.selectedColumn, newType, viewType, 'new', '');
    
    let opRes = this.checkOperation(op1);

    if ( !opRes ) {
      return false;
    }
    else {
      this.operations2.push(op1);
      return true;
    }
  }


  onFillSpecificValue(specificValueModal) {
    // if ( this.operations[this.selectedColumn] )
    // {
    //   for (var i=0; i < this.operations[this.selectedColumn].length; i++) {
    //     if (this.operations[this.selectedColumn][i].operation_type === 'filling_blank') {
    //       this.specificValue = this.operations[this.selectedColumn][i].operation_value.year + '-' + this.operations[this.selectedColumn][i].operation_value.month + '-' + this.operations[this.selectedColumn][i].operation_value.day;
    //       this.specificDateModal = this.modalService.open(specificValueModal, { size: 'lg', backdrop: 'static' });
    //       return;
    //     }
    //   }
    // }
    
    // this.specificValue = '';
    this.specificDateModal = this.modalService.open(specificValueModal, { size: 'lg', backdrop: 'static' });
  }


  onFillStatistic(statisticValueModal) {
    this.viewDatasetService.getStatisticsColumn(this.selectedColumn).subscribe(
      (data: any) => {
        console.log(data);
        this.descriptiveStatisticModal = this.modalService.open(statisticValueModal, { size: 'lg', backdrop: 'static' });
      },
      (error) => console.log(error),
      () => console.log('getStatisticsColumn finished...')
    );
  }


  onSaveSpecificValue( value: any ) {

    console.log('onSaveSpecificValue');
    console.log(value);

    let newValue: any;
    
    if ( this.replaceInt )
    {
      newValue = this.replaceInt;
    }
    else if ( this.replaceBool )
    {
      newValue = this.replaceBool;
    }
    else if ( this.replaceFloat )
    {
      newValue = this.replaceFloat;
    }


    let op1 = new Operation('filling_blank', this.dataset, this.selectedColumn, newValue, newValue, 'new', '');

    console.log(op1);

    this.specificDateModal.close();

    console.log(this.operations2);

    let opRes = this.checkOperation(op1);

    console.log(opRes);

    if ( !opRes ) {
      return false;
    }
    else {
      this.operations2.push(op1);
      return true;
    }
    

  }


  onSelectSpecificDate(date: any) {
    let op1 = new Operation('filling_blank', this.dataset, this.selectedColumn, date, date.year + '-' + date.month + '-' + date.day, 'new', '');
    
    let opRes = this.checkOperation(op1);

    if ( !opRes ) {
      return false;
    }
    else {
      this.operations2.push(op1);
      return true;
    }

    


    // if ( !this.operations[this.selectedColumn] )
    // {
    //   this.operations[this.selectedColumn] = [];
    //   let op1 = new Operation('filling_blank', this.dataset, this.selectedColumn, date, 'new');
    //   this.operations[this.selectedColumn].push(op1);
    //   this.specificValue = date.year + '-' + date.month + '-' + date.day;
    // }
    // else
    // {
    //   let flag = false;
    //   for (var i=0; i < this.operations[this.selectedColumn].length; i++) {
    //     if (this.operations[this.selectedColumn][i].operation_type === 'filling_blank') {
    //       this.operations[this.selectedColumn][i].operation_value = date;
    //       this.specificValue = date.year + '-' + date.month + '-' + date.day;
    //       flag = true;
    //     }
    //   }

    //   if ( !flag )
    //   {
    //     let op1 = new Operation('filling_blank', this.dataset, this.selectedColumn, date, 'new');
    //     this.operations[this.selectedColumn].push(op1);
    //     this.specificValue = date.year + '-' + date.month + '-' + date.day;
    //   }
    // }

  }


  saveOperations() {
    this.columnOperationsModal.close();
  }


  onApplyOperations( operation?: Operation ) {
    // If no operation provided, then apply all operations
    if ( !operation )
    {

      let newOperations = this.operations2.filter( (op) => {
        if ( op.operation_status == 'new' )
          return op;
      });
  
      if ( newOperations.length )
      {
        this.viewDatasetService.applyOperations( newOperations ).subscribe(
          (data: any) => {
            for ( let i=0; i<this.operations2.length; i++ )
            {
              if ( this.operations2[i]['operation_status'] == 'new' )
                this.operations2[i]['operation_status'] = 'applied';
            }
    
            this.onViewDataset();
          },
          (error) => console.log(error),
          () => console.log('Operations Applied...')
        );
      }
      else
      {
        console.log('No new operations found!');
      }

    }
    // Single operation to apply provided
    else
    {
      this.viewDatasetService.applyOperations( [ operation ] ).subscribe(
        (data: any) => {
          for ( let i=0; i<this.operations2.length; i++ )
          {
            if ( this.operations2[i] == operation )
              this.operations2[i]['operation_status'] = 'applied';
          }
  
          this.onViewDataset();
        },
        (error) => console.log(error),
        () => console.log('Single Operation Applied...')
      );
    }


  }


  onViewOperations(viewOperationsModal) {
    this.modalService.open(viewOperationsModal, { size: 'lg', backdrop: 'static' });
  }


  isDate(val) {
    return ( val.constructor.name === 'NgbDate' ) ? true : false;
  }


  applySingleOperation(op) {
    console.log(op);
  }
  
  deleteSingleOperation(op) {
    for ( let i=0; i<this.operations2.length; i++)
    {
      if ( this.operations2[i] == op )
        this.operations2.splice(i, 1);
    }
  }


  // Helper: Check if action is already created
  // checking column and type of operation
  checkOperation(op1: Operation) : boolean {
    if ( !this.operations2.length )
    {
      return true;
    }
    else
    {
      for ( let i=0; i<this.operations2.length; i++ )
      {
        if ( this.operations2[i].operation_column == op1.operation_column &&
              this.operations2[i].operation_type == op1.operation_type )
        return false;
      }

      return true;
    }
  }


  deleteRow( index: Array<number> ) {
    this.viewDatasetService.deleteRows( index ).subscribe(
      (data) => {
        this.onViewDataset();
      },
      (error) => console.log(error),
      () => console.log('Delete Rows finished...')
    );
  }


  getColumnsTypes() {
    this.viewDatasetService.getColumnsTypes().subscribe(
      (data: any) => {
        this.dataColumnsTypes = [];

        for ( let i=0; i<data.index.length; i++ ) {
          this.dataColumnsTypes.push( { column: data.index[i], type: data.data[i].name } );
        }
      },
      (error) => console.log(error),
      () => console.log('Column Types Loaded...')
    );
  }


  getColumnType(selectedColumn) {
    for ( let i=0; i<this.dataColumnsTypes.length; i++ )
    {
      if ( selectedColumn == this.dataColumnsTypes[i].column )
        return this.dataColumnsTypes[i].type;
    }

    return 'undefined';
  }

}
