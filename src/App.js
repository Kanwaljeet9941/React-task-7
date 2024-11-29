import { useEffect, useState } from "react";
import "./App.css";
export default function App() {
  const [secretNum, setSecretNum] = useState(0);
  const [inp, setInp] = useState("");
  const [message, setMessage] = useState("Start Guessing...");
  const [score, setScore] = useState(20);
  const [highscore, setHighScore] = useState(0);

  useEffect(() => {
    randGenerator();
  }, []);

  const randGenerator = () => {
    let num = Math.trunc(Math.random() * 20) + 1;
    setSecretNum(num);
  };

  // console.log(secretNum);
  function handleCheck(e) {
    e.preventDefault();

    //user enters input
    if (inp !== "") {
      // if user lost
      if (score === 0) {
        setMessage("💥 You lost the game!");
      }
      // if user wins
      else if (secretNum === Number(inp)) {
        setMessage("🎉 Correct Number!");

        // setting highscore
        if (score > highscore) {
          setHighScore(score);
          localStorage.setItem("highscore", score.toString());
        }
        //Changing the background.(body)
        e.target.parentElement.parentElement.parentElement.parentElement.style.backgroundColor =
          "#60b347";
      }
      // if user enter less
      else if (inp < secretNum) {
        setScore((s) => s - 1);
        setMessage("📉 Too Low!");
      }
      // if user enter high
      else {
        setScore((s) => s - 1);
        setMessage("📈 Too High!");
      }
    }
    //user does not enters input
    else if (inp === "") {
      setMessage("⛔ No Number!");
    }
    // default message
    else {
      setMessage("Start Guessing...");
    }
    // clearing up the input field
    setInp("");
  }

  function handleAgain(e) {
    setMessage("Start Guessing...");
    setScore(20);
    randGenerator();
    highscoreSetter();

    //changing the background of the body
    e.target.parentElement.parentElement.parentElement.style.backgroundColor =
      "#222";
  }

  function highscoreSetter() {
    if (localStorage.getItem("highscore") !== null) {
      setHighScore(parseInt(localStorage.getItem("highscore")));
    }
  }

  return (
    <>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 to 20)</p>
        <button className="btn again" onClick={handleAgain}>
          Again!
        </button>
        <div className="number">
          {message === "🎉 Correct Number!" ? `${secretNum}` : "?"}
        </div>
      </header>
      <main>
        <form className="left">
          <input
            type="number"
            className="guess"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          ></input>
          <button className="btn check" onClick={handleCheck}>
            Check
          </button>
        </form>
        <section className="right">
          <p className="message">{message}</p>
          <p className="label-score">
            💯 Score: <span className="score">{score}</span>
          </p>
          <p className="label-highscore">
            🥇 Highscore: <span>{highscore}</span>
          </p>
        </section>
        <button
          className="bttn"
          onClick={() => {
            localStorage.setItem("highscore", 0);
            highscoreSetter();
          }}
        >
          clearhighscore
        </button>
      </main>
    </>
  );
}
