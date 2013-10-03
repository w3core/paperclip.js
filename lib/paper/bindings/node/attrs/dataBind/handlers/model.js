// Generated by CoffeeScript 1.6.2
var ChangeDecor, ModelAttrBinding, dref, type, _, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require("underscore");

ChangeDecor = require("./change");

type = require("type-component");

dref = require("dref");

ModelAttrBinding = (function(_super) {
  __extends(ModelAttrBinding, _super);

  function ModelAttrBinding() {
    this._elementValue = __bind(this._elementValue, this);
    this._onValueChange = __bind(this._onValueChange, this);
    this._onChange = __bind(this._onChange, this);
    this._onElementChange = __bind(this._onElementChange, this);    _ref = ModelAttrBinding.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /*
  */


  ModelAttrBinding.prototype.bind = function() {
    ModelAttrBinding.__super__.bind.apply(this, arguments);
    (this.$element = $(this.node)).bind(ChangeDecor.events, this._onElementChange);
    this._onChange();
    return this.clip.context.bind("name", this._onChange);
  };

  /*
  */


  ModelAttrBinding.prototype._onElementChange = function(event) {
    var _this = this;

    event.stopPropagation();
    clearTimeout(this._changeTimeout);
    return this._changeTimeout = setTimeout((function() {
      var model, name, ref, refs, value;

      value = _this._parseValue(_this._elementValue());
      name = _this._elementName();
      refs = _this.script.script.refs;
      model = _this.clip.get("model");
      if (_this.clip.get("bothWays") !== false) {
        ref = name || (refs.length ? refs[0] : void 0);
        if (!name) {
          model = _this.context;
        }
        _this.currentValue = value;
        if (model) {
          if (model.set) {
            return model.set(ref, value);
          } else {
            return dref.set(model, ref, value);
          }
        }
      }
    }), 5);
  };

  /*
  */


  ModelAttrBinding.prototype.dispose = function() {
    var _ref1, _ref2;

    if ((_ref1 = this._modelBinding) != null) {
      _ref1.dispose();
    }
    return (_ref2 = this.$element) != null ? _ref2.unbind(ChangeDecor.events, this._onElementChange) : void 0;
  };

  /*
  */


  ModelAttrBinding.prototype._onChange = function() {
    var model, name, _ref1;

    model = this.clip.get("model");
    name = this._elementName();
    if ((_ref1 = this._modelBinding) != null) {
      _ref1.dispose();
    }
    if (name) {
      return this._modelBinding = model != null ? model.bind(name).to(this._onValueChange).now() : void 0;
    } else if (type(model) !== "object") {
      return this._onValueChange(model);
    }
  };

  /*
  */


  ModelAttrBinding.prototype._onValueChange = function(value) {
    return this._elementValue(this._parseValue(value));
  };

  /*
  */


  ModelAttrBinding.prototype._parseValue = function(value) {
    var v;

    if ((value == null) || value === "") {
      return void 0;
    }
    if (isNaN(v = Number(value)) || (String(value).substr(0, 1) === "0" && String(value).length > 1)) {
      return value;
    } else {
      return v;
    }
  };

  /*
  */


  ModelAttrBinding.prototype._elementValue = function(value) {
    var isInput;

    if (value == null) {
      value = "";
    }
    isInput = Object.prototype.hasOwnProperty.call(this.node, "value") || /input|textarea|checkbox/.test(this.node.nodeName.toLowerCase());
    if (!arguments.length) {
      if (isInput) {
        return this._checkedOrValue();
      } else {
        return this.node.innerHTML;
      }
    }
    if (this.currentValue === value) {
      return;
    }
    this.currentValue = value;
    if (isInput) {
      return this._checkedOrValue(value);
    } else {
      return this.node.innerHTML = value;
    }
  };

  /*
  */


  ModelAttrBinding.prototype._elementName = function() {
    return $(this.node).attr("name");
  };

  /*
  */


  ModelAttrBinding.prototype._checkedOrValue = function(value) {
    var isCheckbox, isRadio, isRadioOrCheckbox;

    isCheckbox = /checkbox/.test(this.node.type);
    isRadio = /radio/.test(this.node.type);
    isRadioOrCheckbox = isCheckbox || isRadio;
    if (!arguments.length) {
      if (isRadioOrCheckbox) {
        return $(this.node).val();
      } else {
        return this.node.value;
      }
    }
    if (isRadioOrCheckbox) {
      if (isRadio) {
        if (String(value) === String($(this.node).val())) {
          return $(this.node).prop("checked", true);
        }
      } else {
        return this.node.checked = value;
      }
    } else {
      return this.node.value = value;
    }
  };

  return ModelAttrBinding;

})(require("./base"));

module.exports = ModelAttrBinding;