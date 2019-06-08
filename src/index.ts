import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/data-grid-view')
  ]);
}

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