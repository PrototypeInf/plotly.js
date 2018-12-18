/**
* Copyright 2012-2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';

var Registry = require('../../registry');
var Lib = require('../../lib');
var colorscaleDefaults = require('../../components/colorscale/defaults');
var attributes = require('./attributes');

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    coerce('x');
    coerce('y');
    coerce('z');

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y', 'z'], layout);

    // Coerce remaining properties
    [
        'volume',
        'isovalue',
        'meshalgo',
        'text',
        'lighting.ambient',
        'lighting.diffuse',
        'lighting.specular',
        'lighting.roughness',
        'lighting.fresnel',
        'lighting.vertexnormalsepsilon',
        'lighting.facenormalsepsilon',
        'lightposition.x',
        'lightposition.y',
        'lightposition.z',
        'contour.show',
        'contour.color',
        'contour.width',
        'colorscale',
        'reversescale',
        'flatshading',
        'opacity'
    ].forEach(function(x) { coerce(x); });

    if('colorscale' in traceIn) {
        colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'c'});
    } else {
        traceOut.showscale = false;

        if('facecolor' in traceIn) coerce('facecolor');
        else if('vertexcolor' in traceIn) coerce('vertexcolor');
        else coerce('color', defaultColor);
    }
};
