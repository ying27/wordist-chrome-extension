var zepto = require('zepto-browserify');
var $ = zepto.$;

function getSelectionCoords (win) {
  win = win || window;
  var doc = win.document;
  var sel = doc.selection, range, rects, rect;
  var x = 0, y = 0;
  if (sel) {
    if (sel.type != 'Control') {
      range = sel.createRange();
      range.collapse(true);
      x = range.boundingLeft;
      y = range.boundingTop;
    }
  } else if (win.getSelection) {
    sel = win.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
        range.collapse(true);
        rects = range.getClientRects();
        if (rects.length > 0) {
          rect = rects[0];
        }
        x = rect.left;
        y = rect.top;
      }
      // Fall back to inserting a temporary element
      if (x == 0 && y == 0) {
        var span = doc.createElement('span');
        if (span.getClientRects) {
          // Ensure span has dimensions and position by
          // adding a zero-width space character
          span.appendChild(doc.createTextNode('\u200b'));
          range.insertNode(span);
          rect = span.getClientRects()[0];
          x = rect.left;
          y = rect.top;
          var spanParent = span.parentNode;
          spanParent.removeChild(span);

          // Glue any broken text nodes back together
          spanParent.normalize();
        }
      }
    }
  }
  return { x: x, y: y };
}

var sel = window.getSelection();

$('.hackdediccionario').remove();

if (sel.anchorNode != null) {
    sel = sel.toString();

    var container = document.createElement('div');
    sel = sel.toString();
    container.innerHTML = "<p class='searchedWord'>" + sel +
      "</p><hr/><p class='wordDefinition'>Loading...</p>";
    container.className = 'hackdediccionario';
    document.body.appendChild(container);


    var re = new XMLHttpRequest();
    //re.open('POST', 'http://wordist.herokuapp.com/api/word', true);
    re.open('POST', 'http://wordist.herokuapp.com/api/word', true);
    re.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    re.onload = function (e) {
    if (re.readyState === 4) {
        if (re.status === 200) {
            $('.wordDefinition').html(re.responseText);
            setTimeout(function () {
                $('.hackdediccionario').remove();
            }, 16000);
        } else {
            console.error(re.statusText);
        }
    }
  };
  re.onerror = function (e) {
    console.error(re.statusText);
  };
  re.send(JSON.stringify({email: 'florrts@gmail.com', word: sel}));
// console.log(getSelectionCoords());
}
