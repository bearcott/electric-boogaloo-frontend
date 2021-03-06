// chord generator code borrowed from fjsj's ukechords
// https://github.com/fjsj/ukechords
import teoria from './teoria';
import _ from 'underscore';

export default (function() {
  var frets, n, permutations, tNote, tNoteScales, tuning, tuningNotes;
  permutations = function(input) {
    var permArr, permuteAux, used;
    used = [];
    permArr = [];
    permuteAux = function() {
      var i, item, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = input.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        item = input.splice(i, 1)[0];
        used.push(item);
        if (input.length === 0) {
          permArr.push(used.slice());
        }
        permuteAux(input);
        input.splice(i, 0, item);
        _results.push(used.pop());
      }
      return _results;
    };
    permuteAux(input);
    return permArr;
  };
  tuning = ["G4", "C4", "E4", "A4"];
  tuningNotes = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = tuning.length; _i < _len; _i++) {
      n = tuning[_i];
      _results.push(teoria.note(n));
    }
    return _results;
  })();
  tNoteScales = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = tuningNotes.length; _i < _len; _i++) {
      tNote = tuningNotes[_i];
      _results.push(tNote.scale("chromatic"));
    }
    return _results;
  })();
  frets = function(chord) {
    var chordNotes, chordNotesCombs, degree, diff, diffNoZeros, enDegrees, enDg, fretsVars, i, pNote, pNoteEn, permutNotes, _i, _j, _len, _len1, _ref;
    chordNotes = teoria.chord(chord, 4).notes;
    if (chordNotes.length === 4) {
      chordNotesCombs = [chordNotes];
    } else {
      chordNotesCombs = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = chordNotes.length; _i < _len; _i++) {
          n = chordNotes[_i];
          _results.push(chordNotes.concat([n]));
        }
        return _results;
      })();
    }
    fretsVars = [];
    for (_i = 0, _len = chordNotesCombs.length; _i < _len; _i++) {
      chordNotes = chordNotesCombs[_i];
      _ref = permutations(chordNotes);
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        permutNotes = _ref[_j];
        diff = (function() {
          var _k, _ref1, _results;
          _results = [];
          for (i = _k = 0, _ref1 = tuningNotes.length; 0 <= _ref1 ? _k < _ref1 : _k > _ref1; i = 0 <= _ref1 ? ++_k : --_k) {
            tNote = tuningNotes[i];
            pNote = permutNotes[i];
            degree = pNote.scaleDegree(tNoteScales[i]) - 1;
            if (degree >= 0) {
              _results.push(degree);
            } else {
              enDegrees = (function() {
                var _l, _len2, _ref2, _results1;
                _ref2 = pNote.enharmonics();
                _results1 = [];
                for (_l = 0, _len2 = _ref2.length; _l < _len2; _l++) {
                  pNoteEn = _ref2[_l];
                  try {
                    _results1.push(pNoteEn.scaleDegree(tNoteScales[i]) - 1);
                  } catch (e) {
                    _results1.push(-1);
                  }
                }
                return _results1;
              })();
              _results.push(_((function() {
                var _l, _len2, _results1;
                _results1 = [];
                for (_l = 0, _len2 = enDegrees.length; _l < _len2; _l++) {
                  enDg = enDegrees[_l];
                  if (enDg >= 0) {
                    _results1.push(enDg);
                  }
                }
                return _results1;
              })()).min());
            }
          }
          return _results;
        })();
        diffNoZeros = _(diff).compact();
        if (diffNoZeros.length > 0) {
          if (_(diffNoZeros).max() - _(diffNoZeros).min() < 4) {
            fretsVars.push(diff);
          }
        } else {
          fretsVars.push(diff);
        }
      }
    }
    fretsVars = _(fretsVars).reject(function(fret) {
      return _(fret).contains(-1);
    });
    fretsVars = _(fretsVars).sortBy(function(fret) {
      var fingerDist, fingerSum, fretMax;
      fretMax = _(fret).max();
      fingerSum = fret.reduce((function(memo, num) {
        return memo + (num === 0 ? 0 : 1);
      }), 0);
      fingerDist = _(fret).max() - _(_(fret).compact()).min();
      return fretMax * 0.7 + fingerSum * 0.1 + fingerDist * 0.2;
    });
    return _(_(fretsVars).map(function(fret) {
      return fret.join("");
    })).uniq();
  };
  return frets;
})();
