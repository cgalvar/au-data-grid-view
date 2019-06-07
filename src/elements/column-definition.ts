
export interface ColumnDefinition{
    name: string;
    inputType: string;
    propertyKey?: string;
    getValue?:Function;
    onFilter?:Function;
    valueConverter?:string;
    valueConverterParams?:any;
    multipleValues?: string;
    selectOptions?: any[];
    optionPropertyKey?: string;
    getSelectOptions?: Function;
    getOptionValue?: Function;
    allOption?: boolean;
    orderBy?: boolean;
    enableFilter?:boolean;
}