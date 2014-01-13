module.exports = Canvas = function() {
  console.log('Browser constructor');
};
Canvas.prototype.hello = function(){
  console.log('I\'m browser');
};
Canvas.prototype.startListeningKeyEvents = function() {

  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 40 && loop.speed!=70) {
      loop.createInterval(70);
    }
  }, false);

  document.addEventListener("keyup", function(e) {
    if (loop.speed!=1000) {
      loop.createInterval(1000);
    }
  }, false);
}
