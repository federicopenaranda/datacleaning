export class Operation {
    operation_type: string;
    operation_dataset: string;
    operation_column: string;
    operation_value: any;
    operation_value_view: any;
    operation_status: string;
    operation_execution_response: string;
  
    constructor( operation_type: string,
                operation_dataset: string,
                operation_column: string,
                operation_value: any,
                operation_value_view: any,
                operation_status: string,
                operation_execution_response: string )
    {
        this.operation_type = operation_type;
        this.operation_dataset = operation_dataset;
        this.operation_column = operation_column;
        this.operation_value = operation_value;
        this.operation_value_view = operation_value_view;
        this.operation_status = operation_status;
        this.operation_execution_response = operation_execution_response;
    }
  }