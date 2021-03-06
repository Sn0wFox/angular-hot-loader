module.exports = function (name, def) {
  if (def.template) {
    def.template = () => {
      return this.templateCache[name];
    };
  }

  if (def.controller && typeof def.controller === 'function') {
    const that = this;
    def.controller = function ($injector, $scope, $element, $attrs, $transclude) {
      return $injector.invoke(
        that.classTransform(that.controllerCache[name]),
        this,
        {
          $scope,
          $element,
          $attrs,
          $transclude
        }
      );
    };
  }

  return def;
};
