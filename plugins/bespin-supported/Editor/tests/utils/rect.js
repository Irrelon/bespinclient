/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and
 * limitations under the License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * ***** END LICENSE BLOCK ***** */

require('sproutcore/runtime');
var t = require('PluginDev');
var Rect = require('utils/rect');

exports.testDistanceFromBounds = function() {
    t.equal(Rect._distanceFromBounds(1, 3, 5), -2,
        "the distance between 1 and [3,5], and -2");
    t.equal(Rect._distanceFromBounds(2, 2, 3), 0,
        "the distance between 2 and [2,3], and 0");
    t.equal(Rect._distanceFromBounds(5, 4, 6), 0,
        "the distance between 5 and [4,6], and 0");
    t.equal(Rect._distanceFromBounds(7, 4, 7), 0,
        "the distance between 7 and [4,7], and 0");
    t.equal(Rect._distanceFromBounds(1, -5, -2), 3,
        "the distance between 1 and [-5,-2], and 3");
};

exports.testOffsetFromRect = function() {
    var rect = { x: 0, y: 0, width: 1, height: 1 };
    t.deepEqual(Rect.offsetFromRect(rect, { x: -1, y: -1 }), { x: -1, y: -1 },
        "the offset from (-1,-1) to the unit square and (-1,-1)");
    t.deepEqual(Rect.offsetFromRect(rect, { x: 0, y: -1 }), { x: 0, y: -1 },
        "the offset from (0,-1) to the unit square and (0,-1)");
    t.deepEqual(Rect.offsetFromRect(rect, { x: 2, y: -1 }), { x: 1, y: -1 },
        "the offset from (2,-1) to the unit square and (1,-1)");
    t.deepEqual(Rect.offsetFromRect(rect, { x: -1, y: 0.5 }), { x: -1, y: 0 },
        "the offset from (-1,0.5) to the unit square and (-1,0)");
    t.deepEqual(Rect.offsetFromRect(rect, { x: 0.25, y: 1 }), { x: 0, y: 0 },
        "the offset from (0.25,1) to the unit square and (0,0)");
    t.deepEqual(Rect.offsetFromRect(rect, { x: 5, y: 0 }), { x: 4, y: 0 },
        "the offset from (5,0) to the unit square and (4,0)");
    t.deepEqual(Rect.offsetFromRect(rect, { x: -2, y: 2 }), { x: -2, y: 1 },
        "the offset from (-2,2) to the unit square and (-2,1)");
    t.deepEqual(Rect.offsetFromRect(rect, { x: 0.5, y: 3 }), { x: 0, y: 2 },
        "the offset from (0.5,3) to the unit square and (0,2)");
    t.deepEqual(Rect.offsetFromRect(rect, { x: 100, y: 2 }), { x: 99, y: 1 },
        "the offset from (100,2) to the unit square and (99,1)");
};
