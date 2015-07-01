/**
 * Created by postepenno on 01.07.2015.
 */

app.directive("circleItem", function (RandomColor, Grid, Gameplay, $timeout, Utils, Snd) {
  return {
    link: function (scope, el, attrs) {
      //console.log(scope.$index, scope.item.id);
      var pos = Grid.getPos(scope.$index);
      var color = RandomColor.get();
      el.addClass('circle-item circle-tweens');
      el.css({
        left:pos.x + "px",
        top:pos.y + "px",
        "background-color":color
      });

      el.on('click', function (e) {
        //e.preventDefault(); // why it doesn't work?

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

