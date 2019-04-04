export class Operation {
    operation_type: string;
    operation_dataset: string;
    operation_column: string;
    : string;
  
    constructor( attributes_id: number, 
                  attribute_name: string, 
                  attribute_description: string, 
                  attribute_value: string )
    {
      this.attributes_id = attributes_id;
      this.attribute_name = attribute_name;
      this.attribute_description = attribute_description;
      this.attribute_value = attribute_value;
    }
  }