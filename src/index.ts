import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';


export function configure(config: FrameworkConfiguration) {
  // config.aurelia.use.plugin('aurelia-selectable');
  
  config.plugin(PLATFORM.moduleName('@cgalvar/au-selectable'))
  .plugin(PLATFORM.moduleName('@cgalvar/au-some-value-converters'))
  .plugin(PLATFORM.moduleName('@cgalvar/au-toggle-button'));
  
  config.globalResources([
    PLATFORM.moduleName('./elements/data-grid-view')
  ]);


}

export {DataGridView} from './elements/data-grid-view';
export {ColumnDefinition} from './elements/column-definition';