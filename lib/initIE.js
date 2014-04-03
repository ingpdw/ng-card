
(function (exports) {

if ( !window.Element ){
    Element = function(){};

    var __createElement = document.createElement;
    document.createElement = function(tagName)
    {
        var element = __createElement(tagName);
        if (element == null) {return null;}
        for(var key in Element.prototype)
                element[key] = Element.prototype[key];
        return element;
    }

    var __getElementById = document.getElementById;
    document.getElementById = function(id)
    {
        var element = __getElementById(id);
        if (element == null) {return null;}
        for(var key in Element.prototype)
                element[key] = Element.prototype[key];
        return element;
    }
};

if (!document.querySelectorAll) {
    document.querySelectorAll = function(selector) {
        var doc = document,
            head = doc.documentElement.firstChild,
            styleTag = doc.createElement('STYLE');
        head.appendChild(styleTag);
        doc.__qsaels = [];
 
        styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsaels.push(this))}";
        window.scrollBy(0, 0);
 
        return doc.__qsaels;
    }
};

    
  var debug = window.ieShivDebug || false,
      tags = [ "ngInclude", "ngPluralize", "ngView", "ngSwitch", "uiCurrency", "uiCodemirror", "uiDate", "uiEvent",
                "uiKeypress", "uiKeyup", "uiKeydown", "uiMask", "uiMapInfoWindow", "uiMapMarker", "uiMapPolyline",
                "uiMapPolygon", "uiMapRectangle", "uiMapCircle", "uiMapGroundOverlay", "uiModal", "uiReset",
                "uiScrollfix", "uiSelect2", "uiShow", "uiHide", "uiToggle", "uiSortable", "uiTinymce"
                ];

  window.myCustomTags =  window.myCustomTags || []; // externally defined by developer using angular-ui directives
  tags.push.apply(tags, window.myCustomTags);

  var toCustomElements = function (str) {
    var result = [];
    var dashed = str.replace(/([A-Z])/g, function ($1) {
      return " " + $1.toLowerCase();
    });
    var tokens = dashed.split(' ');
    var ns = tokens[0];
    var dirname = tokens.slice(1).join('-');

    // this is finite list and it seemed senseless to create a custom method
    result.push(ns + ":" + dirname);
    result.push(ns + "-" + dirname);
    result.push("x-" + ns + "-" + dirname);
    result.push("data-" + ns + "-" + dirname);
    return result;
  };

  for (var i = 0, tlen = tags.length; i < tlen; i++) {
    var customElements = toCustomElements(tags[i]);
    for (var j = 0, clen = customElements.length; j < clen; j++) {
      var customElement = customElements[j];
      document.createElement(customElement);
    }
  }

})(window);