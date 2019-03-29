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

  public deleteColumn( column: string ) {
    return this.http.post( 'http://localhost:5000/delete_column', {
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


}
