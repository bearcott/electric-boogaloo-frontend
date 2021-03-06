// chord generator code borrowed from fjsj's ukechords
// https://github.com/fjsj/ukechords
import _ from 'underscore';

export default (function() {
  var box_size, clearChord, diagram_xy, drawBox, drawChord, drawDot, drawLine, drawUnknown, hleft, hlines, hright, makeChordBox, vbottom, vbottom_ext, vlines, vtop;
  drawLine = function(ctx, start, end) {
    ctx.beginPath();
    ctx.moveTo(start[0]+0.5, start[1]+0.5);
    ctx.lineTo(end[0]+0.5, end[1]+0.5);
    return ctx.stroke();
  };
  box_size = [96, 128];
  diagram_xy = [24, 24];
  vlines = [24, 40, 56, 72];
  hlines = [26, 46, 66, 86, 106];
  vtop = _.min(hlines);
  vbottom = _.max(hlines);
  vbottom_ext = vbottom + (hlines[1] - hlines[0] - 1);
  hleft = _.min(vlines);
  hright = _.max(vlines);
  drawBox = function(ctx, top, bottom) {
    var b, x, y, _i, _j, _len, _len1, _results;
    if (top) {
      drawLine(ctx, [hleft, hlines[0] - 1], [hright, hlines[0] - 1]);
    }
    for (_i = 0, _len = hlines.length; _i < _len; _i++) {
      y = hlines[_i];
      drawLine(ctx, [hleft, y], [hright, y]);
    }
    if (bottom) {
      b = vbottom_ext;
    } else {
      b = vbottom;
    }
    _results = [];
    for (_j = 0, _len1 = vlines.length; _j < _len1; _j++) {
      x = vlines[_j];
      _results.push(drawLine(ctx, [x, vtop - 1], [x, b]));
    }
    return _results;
  };
  drawDot = function(ctx, string, fret, offset) {
    var x, xdiff, xoff, y, ydiff, yoff;
    if (!(offset != null)) {
      offset = 0;
    }
    xdiff = vlines[1] - vlines[0];
    ydiff = hlines[1] - hlines[0];
    xoff = diagram_xy[0] - xdiff;
    yoff = diagram_xy[1] + 1 - ydiff + ydiff / 2;
    x = string * xdiff + xoff;
    y = (fret - offset) * ydiff + yoff;
    drawLine(ctx, [x - 2, y - 1], [x - 2, y + 1]);
    drawLine(ctx, [x - 1, y - 2], [x - 1, y + 2]);
    drawLine(ctx, [x + 1, y - 2], [x + 1, y + 2]);
    return drawLine(ctx, [x + 2, y - 1], [x + 2, y + 1]);
  };
  makeChordBox = function(ctx, namestr, fretstr) {
    var bar, barpos, diff, f, frets, mn, mx, name, offset, string, _i, _len;
    name = namestr.split(".")[0];
    name = name.replace("dim", "°");
    bar = false;
    barpos = 0;
    if (fretstr[0] === "|") {
      fretstr = fretstr.slice(1);
      bar = true;
    }
    frets = _(fretstr.split("")).map(function(x) {
      return parseInt(x, 10);
    });
    mn = _.min(_(frets).compact());
    mx = _.max(frets);
    diff = mx - mn;
    if (diff > 4) {
      throw new Error("Fret difference too great for " + namestr);
    }
    offset = 0;
    if (mx > 4) {
      offset = mn;
    }
    if (bar) {
      barpos = _.min(frets);
    }
    // ctx.font = '10px Arial, sans-serif';
    // ctx.textAlign = 'center';
    // ctx.fillText(name, box_size[0] / 2, 8);
    drawBox(ctx, offset === 0, diff === 4);
    string = 1;
    for (_i = 0, _len = frets.length; _i < _len; _i++) {
      f = frets[_i];
      if (f !== 0 && f !== barpos) {
        drawDot(ctx, string, f, _.max([offset - 1, 0]));
      }
      string += 1;
    }
    if (bar) {
      drawDot(ctx, 1, barpos, _.max([offset - 1, 0]));
      drawDot(ctx, 2, barpos, _.max([offset - 1, 0]));
      drawDot(ctx, 3, barpos, _.max([offset - 1, 0]));
      drawDot(ctx, 4, barpos, _.max([offset - 1, 0]));
    }
    if (offset) {
      ctx.textAlign = 'left';
      return ctx.fillText(offset, 2, 20);
    }
  };
  clearChord = function(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, box_size[0], box_size[1]);
    return ctx.fillStyle = "black";
  };
  drawChord = function(ctx, namestr, fretstr) {
    clearChord(ctx);
    return makeChordBox(ctx, namestr, fretstr);
  };
  drawUnknown = function(ctx) {
    clearChord(ctx);
    ctx.font = '12px Arial, sans-serif';
    ctx.textAlign = 'center';
    return ctx.fillText("???", box_size[0] / 2, box_size[1] / 2);
  };
  return {
    drawChord: drawChord,
    drawUnknown: drawUnknown
  };
})();
