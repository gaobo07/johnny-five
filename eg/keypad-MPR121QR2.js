var exec = require("child_process").exec;
var argv = require("minimist")(process.argv.slice(2), { default: { show: 1 } });
var five = require("../");
var board = new five.Board();

board.on("ready", function() {
  // MPR121QR2 3x3 Capacitive Touch Shield
  var keypad;

  if (argv.show === 1) {
    keypad = new five.Keypad({
      controller: "MPR121QR2",
      address: 0x5A
    });
  }

  if (argv.show === 2) {
    keypad = new five.Keypad({
      controller: "MPR121QR2",
      address: 0x5A,
      keys: [
        ["!", "@", "#"],
        ["$", "%", "^"],
        ["&", "-", "+"],
      ]
    });
  }

  if (argv.show === 3) {
    keypad = new five.Keypad({
      controller: "MPR121QR2",
      address: 0x5A,
      keys: ["!", "@", "#", "$", "%", "^", "&", "-", "+"]
    });
  }

  ["change", "press", "hold", "release"].forEach(function(event) {
    keypad.on(event, function(data) {
      // console.log("Event: %s, Which: %s", event, data);

      if (event === "press") {
        exec("say " + data);
      }
    });
  });
});