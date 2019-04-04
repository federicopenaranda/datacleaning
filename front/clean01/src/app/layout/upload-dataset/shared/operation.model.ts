export class Operation {
    operation_type: string;
    operation_dataset: string;
    operation_column: string;
    operation_value: string;
  
    constructor( operation_type: string,
                operation_dataset: string,
                operation_column: string,
                operation_value: string )
    {
        this.operation_type = operation_type;
        this.operation_dataset = operation_dataset;
        this.operation_column = operation_column;
        this.operation_value = operation_value;
    }
  }