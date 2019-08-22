import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface ServerResponse {
  success: string;
  msg: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoadDatasetService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'application/json'}),
    withCredentials: true
  };

  constructor( private http: HttpClient ) { }


  public getDatasets() {
    return this.http.get( 'http://localhost:3000/datasets/dataset_list', {
      withCredentials: true
    });
  }


  public loadDataset( dataset: string ) {
    return this.http.post( 'http://localhost:5000/load_dataset', {
      params: {
        'dataset': dataset
      }
    }, this.httpOptions);
  }


  public viewDataset( dataset: string ) {
    return this.http.post( 'http://localhost:5000/view_dataset', {
      params: {
        'dataset': dataset
      }
    }, this.httpOptions);
  }


  public shapeDataset() {
    return this.http.get( 'http://localhost:5000/shape_dataset');
  }


  public infoColumn( column: string ) {
    return this.http.post( 'http://localhost:5000/info_column', {
      params: {
        'column': column
      }
    }, this.httpOptions);
  }


  public setSelectedDataset( datasetFile: string ) {
    return sessionStorage.setItem('activeDataset', datasetFile);
  }


  public getSelectedDataset() {
    return sessionStorage.getItem('activeDataset');
  }


  public applyOperations( operations: any ) {
    return this.http.post( 'http://localhost:5000/apply_operations', {
      params: {
        'operations': operations
      }
    }, this.httpOptions);
  }


  public deleteRows( index: Array<number> ) {
    return this.http.post( 'http://localhost:5000/delete_row', {
      params: {
        'index': index
      }
    }, this.httpOptions);
  }


  public getColumnsTypes () {
    return this.http.get( 'http://localhost:5000/columns_types');
  }


  public getStatisticsColumn ( column: string ) {
    return this.http.post( 'http://localhost:5000/get_statistics_column', {
      params: {
        'column': column
      }
    }, this.httpOptions);
  }


}
