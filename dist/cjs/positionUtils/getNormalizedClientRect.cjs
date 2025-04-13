'use strict';

const getNativeDimension = (transformed, untransformed) => Math.round(transformed) === untransformed ? transformed : untransformed;
const getNormalizedClientRect = element => {
  const rect = element.getBoundingClientRect();
  rect.width = getNativeDimension(rect.width, element.offsetWidth);
  rect.height = getNativeDimension(rect.height, element.offsetHeight);
  return rect;
};

exports.getNormalizedClientRect = getNormalizedClientRect;
