import {Aurelia} from 'aurelia-framework'
import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    // load the plugin ../src
    // The "resources" is mapped to "../src" in aurelia.json "paths"
    .feature('resources');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.use.plugin('@cgalvar/au-selectable')
  .plugin('@cgalvar/au-some-value-converters')
  .plugin('@cgalvar/au-toggle-button')

  aurelia.start().then(() => aurelia.setRoot());
}
