function checkAnswers() {
    var score = 0;
    var answers = ["d", "a", "d", "d", "a", "a", "d", "c", "d", "b"];
    var inputs = document.querySelectorAll("input[type='radio']:checked");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value == answers[i]) {
        score++;
      }
    }
    alert("You scored " + score + " out of " + answers.length);
}