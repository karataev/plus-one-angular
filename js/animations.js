/**
 * Created by postepenno on 01.07.2015.
 */

app.animation(".circle-tweens", function () {
  return {
    enter: function (el, done) {
      var scope = el.scope();
      var delay = scope.$index / 10;
      TweenMax.set(el, {scale:0});
      TweenMax.to(el, 0.5, {scale:1, ease:Back.easeOut, delay:delay, onComplete:done});
    },
    leave: function (el, done) {
      TweenMax.to(el, 0.5, {scale:0, onComplete:done});
    }
  }
})

app.animation(".anim-complete", function () {
  return {
    enter: function (el, done) {
      TweenMax.from(el, 0.5, {scale:0, ease:Back.easeOut});
      TweenMax.from(el, 2.0, {y:"+=150", ease:Power0.easeNone});
      TweenMax.to(el, 0.5, {delay:1.5, scale:0, ease:Back.easeIn, onComplete:done})
    }
  }
})
