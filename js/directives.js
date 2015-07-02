/**
 * Created by postepenno on 01.07.2015.
 */

app.directive("circleItem", function (RandomColor, Grid, Gameplay, $timeout, Utils, Snd) {
  return {
    link: function (scope, el, attrs) {
      //console.log(scope.$index, scope.item.id);
      var pos = Grid.getPos2(scope.$index);
      var color = RandomColor.get();
      el.addClass('circle-item circle-tweens');
      el.css({
        left:pos.x + "px",
        top:pos.y + "px",
        "background-color":color
      });

      el.on('mousedown', function (e) {
        e.preventDefault();

        if (Gameplay.isCorrect(scope.item.id)) {
          el.off();
          Gameplay.proceed();
          scope.main.maybeLevelComplete();
          Snd.correct();
          scope.$apply();
        } else {
          Utils.wobble(el);
          Snd.wrong();
        }

      })
    }
  }
})

app.directive("sndIcon", function (Snd) {
  return {
    controller: function ($scope) {
      $scope.isEnabled = Snd.isEnabled;
    },
    link: function (scope, el, attrs) {
      el.on("click", function () {
        Snd.toggle();
        scope.$apply();
      })
    },
    replace:true,
    template:'<div class="bt">' +
    '<img ng-if="isEnabled()" src="img/soundIconOn.png" alt=""/>' +
    '<img ng-if="!isEnabled()" src="img/soundIconOff.png" alt=""/>' +
    '</div>'
  }
})
