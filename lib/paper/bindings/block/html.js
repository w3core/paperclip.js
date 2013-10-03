// Generated by CoffeeScript 1.6.2
var HtmlDecor, type, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

type = require("type-component");

HtmlDecor = (function(_super) {
  __extends(HtmlDecor, _super);

  function HtmlDecor() {
    _ref = HtmlDecor.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /*
  */


  HtmlDecor.prototype._onChange = function(value, oldValue) {
    var dom, node;

    if (oldValue != null ? oldValue.section : void 0) {
      oldValue.section.hide();
    }
    this.section.removeAll();
    if (!value) {
      return this.section.removeAll();
    }
    if (value.createFragment) {
      node = value.createFragment();
    } else if (value.section) {
      node = value.section.show().toFragment();
    } else if (value.nodeType != null) {
      node = value;
    } else {
      if (this.nodeFactory.name === "string") {
        node = this.nodeFactory.createTextNode(String(value));
      } else {
        dom = this.nodeFactory.createElement("div");
        dom.innerHTML = String(value);
        node = this.nodeFactory.createFragment(dom.childNodes);
      }
    }
    return this.section.replaceChildNodes(node);
  };

  return HtmlDecor;

})(require("./base"));

module.exports = HtmlDecor;