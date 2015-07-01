/**
 * Created by postepenno on 01.07.2015.
 */

app.factory("RandomColor", function () {
  var colors = ["#79C2ED","#F9C205","#E97619","#D92250","#6C6297","#419283","#88BF26"];
  var tempColors = colors.slice();
  return {
    get: function () {
      if (tempColors.length == 0) tempColors = colors.slice();
      var index = Math.floor(Math.random() * tempColors.length);
      return tempColors.splice(index, 1)[0];
    }
  }
})

//TODO: different layout, less space between elements
app.factory("Grid", function (Gameplay) {
  var totalWidth = 320;
  var totalHeight = 400;
  var itemWidth = 60;
  var itemHeight = 60;
  return {
    getPos: function (id) {
      var curLevel = Gameplay.getCurLevel();
      var levelRows = curLevel.rows;
      var levelCols = curLevel.cols;
      var dx = totalWidth / levelCols;
      var dy = totalHeight / levelRows;
      var offsetX = (dx - itemWidth) / 2;
      var offsetY = (dy - itemHeight) / 2;
      var x = offsetX + (id % levelCols) * dx;
      var y = offsetY + Math.floor(id / levelCols) * dy;
      return {x: x, y:y};
    }
  }
})

app.factory("Gameplay", function ($http) {

  var levels;
  var items;
  var curLevel = undefined;
  var curCircleId = undefined;

  function getItemById(id) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) return items[i];
    }
    return null;
  }

  return {
    load: function (callback) {
      $http.get("data/data.json")
        .success(function (data) {
          var ID = 0;
          levels = data.levels;
          levels.forEach(function (level) {
            level.id = ID++;
          })
          //levels = levels.filter(function (level) { return level.id == levels.length - 1; });
          //console.log(levels);
          callback();
        })
    },
    levelStart: function (id) {
      curLevel = levels[id];
      var tempItems = [];
      var total = curLevel.cols * curLevel.rows;
      for (var i = 0; i < total; i++) {
        var value = curLevel.start + curLevel.increment * i;
        tempItems.push({id:i, value:value});
      }
      items = _.shuffle(tempItems);
      curCircleId = 0;
    },
    getCurLevel: function () {
      return curLevel;
    },
    isLevelExist: function (id) {
      return levels[id] !== undefined;
    },
    getLevelItems: function () {
      return items;
    },
    isCorrect: function (id) {
      return id === curCircleId;
    },
    proceed: function () {
      var item = getItemById(curCircleId);
      var index = items.indexOf(item);
      items.splice(index, 1);
      curCircleId++;
    }
  }
})


app.factory("Utils", function () {
  return {
    wobble: function (el) {
      var dt = 0.1;
      TweenMax.to(el, dt, {x:"+=5", ease:Power1.easeOut});
      TweenMax.to(el, dt * 2, {x:"-=10", delay:dt, ease:Power1.easeInOut});
      TweenMax.to(el, dt * 2, {x:"+=10", delay:dt * 3, ease:Power1.easeInOut});
      TweenMax.to(el, dt, {x:"-=5", delay:dt * 5, ease:Power1.easeIn});
    }
  }
})

app.factory("Snd", function () {

  var sndEnabled = true;
  var sndClick;
  var sndCorrect;
  var sndWrong;
  var sndLevelComplete;

  function play(snd) {
    if (sndEnabled) {
      snd.play();
    }
  }

  return {
    init: function () {
      sndClick = new Howl({
        urls: ['snd/click.mp3']
      });
      sndCorrect = new Howl({
        urls: ['snd/right.mp3']
      });
      sndWrong = new Howl({
        urls: ['snd/wrong.mp3']
      });
      sndLevelComplete = new Howl({
        urls: ['snd/levelComplete.mp3']
      });
    },
    click: function () {
      play(sndClick);
    },
    correct: function () {
      play(sndCorrect);
    },
    wrong: function () {
      play(sndWrong);
    },
    levelComplete: function () {
      play(sndLevelComplete);
    }
  }
})
