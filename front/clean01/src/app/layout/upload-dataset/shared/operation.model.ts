export class Operation {
    operation_type: string;
    operation_dataset: string;
    operation_column: string;
    operation_value: string;
    operation_status: string;
  
    constructor( operation_type: string,
                operation_dataset: string,
                operation_column: string,
                operation_value: string,
                operation_status: string )
    {
        this.operation_type = operation_type;
        this.operation_dataset = operation_dataset;
        this.operation_column = operation_column;
        this.operation_value = operation_value;
        this.operation_status = operation_status;
    }
  }