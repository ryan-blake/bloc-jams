var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {
<<<<<<< HEAD

var revealPoint = function(index) {
              points[index].style.opacity = 1;
              points[index].style.transform = "scaleX(1) translateY(0)";
              points[index].style.msTransform = "scaleX(1) translateY(0)";
              points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
          }

    for (var i = 0; i < points.length; i++){
      revealPoint(i);
    }
  };
      window.onload = function() {
        var sellingPoints = document.getElementsByClassName('selling-points')[0];

        window.addEventListener('scroll', function(event) {
          var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

          if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
                      animatePoints(pointsArray);
                  }
           });
        }
=======
  var revealPoint = function(index) {
    points[index].style.opacity = 0.9;
    points[index].style.transform = "scaleX(1) translateY(0)";
    points[index].style.msTransform = "scaleX(1) translateY(0)";
    points[index].style.WebkitTransform = "scaleX(1) translateY(0)";

  }
  for (var i = 0; i < points.length; i++) {
    revealPoint(i);
  }

};

 window.onload = function() {
   // auto animate for tall screens
   if (window.innerHeight > 950) {
    animatePoints(pointsArray);
}
   var sellingPoints = document.getElementsByClassName('selling-points')[0];
   var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

   window.addEventListener('scroll', function(event) {
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
           animatePoints(pointsArray);
    }
   });
}
>>>>>>> check_26
