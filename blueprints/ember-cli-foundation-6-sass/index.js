/* jshint node:true */

var fs          = require('fs');
var path        = require('path');
var bower       = require(path.resolve(__dirname, '../../bower.json'));

module.exports = {
  description: 'install ember-cli-foundation-6-sass into a typical project',
  normalizeEntityName: function() {},

  beforeInstall: function () {
    return this.addBowerPackageToProject('foundation-sites', bower.dependencies['foundation-sites']);
  },

  afterInstall: function () {
    // Copy the _settings.scss file
    var stylePath = path.join(process.cwd(), 'app', 'styles');
    var foundationPath = path.join(process.cwd(), 'bower_components', 'foundation-sites', 'scss');
    var settingsPath = path.join(foundationPath, 'settings', '_settings.scss');

    fs.writeFileSync(path.join(stylePath, '_settings.scss'), fs.readFileSync(settingsPath));

    return this.addPackagesToProject([
      { name: 'ember-cli-sass', target: '^6.0.0' },
      { name: 'broccoli-clean-css', target: '~1.1.0' }
    ]);
  }
};
