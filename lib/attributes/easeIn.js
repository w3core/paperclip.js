var BaseAttribue = require("./base");

/**
 */

module.exports = BaseAttribue.extend({
  initialize: function () {
    this.view.transitions.push(this);
  },
  enter: function () {
    var v = this.value;
    if (v.evaluate) {
      this.context.complete = function () {};
      this.context.transition = this;
      v = v.evaluate(this.context);
    }
  }
});