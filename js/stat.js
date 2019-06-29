'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = GAP * 5;
var FONT_GAP = CLOUD_HEIGHT - GAP;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var TEXT_GAP = GAP * 4;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, TEXT_GAP + GAP * 2);

  var maxTime = getMaxElement(times);
  var count = names.length < 5 ? names.length : 4;

  for (var i = 0; i < count; i++) {
    var barHeightResult = (BAR_HEIGHT * Math.floor(times[i])) / maxTime;
    var timesRound = Math.round(times[i]);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + FONT_GAP);
    ctx.fillText(timesRound, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP * 3 - barHeightResult);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 48%, 1)';
    }

    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - TEXT_GAP + GAP * 2 - barHeightResult, BAR_WIDTH, barHeightResult);
  }
};

