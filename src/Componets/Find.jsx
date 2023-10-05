import React, { useState, useEffect, useRef, createElement } from "react";
import "./find.css";
import { Findinput } from "./Findinput";

export const Find = () => {
  //  states  //
  const [showinput, setshowinput] = useState(false);
  const [inputdata, setinputdata] = useState("");
  const [totaltextmatches, settotaltextmatches] = useState(0);
  const [currentindex, setcurrentindex] = useState(0);

  //  fetch userinput data //
  const handleinputchange = (e) => {
    setinputdata(e.target.value);
  };

  // fetch dombody using useref//
  const bodyref = useRef(document.body);

  // main function for check matched datas //
  const handlecheckmatchtext = () => {
    // A varible that count the number of matched datas //
    let count = 0;

    // fetching all dom elements  //
    const alltextelements = bodyref.current.querySelectorAll("h1,p,h3");

    // each element is iterated to check for matching data //
    alltextelements.forEach((Eachtextelement) => {
      // fetch the text content of the current element //
      const eachtext = Eachtextelement.innerText;

      // setting regular expression values //
      const regex = new RegExp(inputdata, "gi");

      // Replace all matched words in the current element's text content with highlighted spans //
      const matchedwords = eachtext.replaceAll(regex, (MachtedTextElement) => {
        // setting classname //
        const classname = "yellow";

        // create new span element //
        const span = document.createElement("span");

        // adding classname to the span element //
        span.classList.add(classname);

        // adding matched word to span element //
        if (MachtedTextElement) {
          span.textContent = MachtedTextElement;

          // Increment the counter for matched words //
          count++;
        }

        // replace the matched word in the original text with a styled <span> //
        return span.outerHTML;
      });

      // Replace the current DOM element's content with the modified text //
      Eachtextelement.innerHTML = matchedwords;
    });
    settotaltextmatches(count);

    const firstspan = document.querySelectorAll(".yellow")[currentindex];
    if (firstspan) {
      firstspan.id = "red";
    }
  };

  const reset = () => {
    if (inputdata === "") {
      setcurrentindex(0);
    }
  };

  const handlekeypress = (e) => {
    if (e.ctrlKey && e.key === "f") {
      e.preventDefault();
      setshowinput(true);
    }
    if (showinput) {
      if (e.key === "ArrowLeft") {
        handleleftarrow();
      }

      if (e.key === "ArrowRight") {
        handlerightarrrow();
      }
    }
  };

  useEffect(() => {
    handlecheckmatchtext();
    window.addEventListener("keydown", handlekeypress);
    reset();
    return () => window.removeEventListener("keydown", handlekeypress);
  }, [inputdata, currentindex]);

  const handleleftarrow = () => {
    setcurrentindex((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
  };

  const handlerightarrrow = () => {
    setcurrentindex((prev) => (prev + 1 > totaltextmatches ? 0 : prev + 1));
  };

  const handlecloseinput = () => {
    setshowinput(false);
    setinputdata("");
  };

  return (
    <>
      <section className="data-div">
        <div className="title">
          <h1>"A Boy From Madeira" </h1>
        </div>
        <div className="para-div">
          <h3>Introduction:</h3>
          <p>
            Cristiano Ronaldo, a name synonymous with football excellence, has
            left an enduring mark on the world of sports. This essay delves into
            the remarkable life and career of Cristiano Ronaldo, highlighting
            his origins, achievements, and lasting impact.
          </p>

          <h3>Early Life and Beginnings:</h3>

          <p>
            Born in Madeira, Portugal: Cristiano Ronaldo was born on February 5,
            1985, in Funchal, Madeira, Portugal, and his humble beginnings on
            this small island set the stage for his extraordinary journey.
          </p>

          <p>
            Family Support: Ronaldo's family played a pivotal role in nurturing
            his talent and dedication to the sport, emphasizing the values of
            hard work and discipline.
          </p>

          <p>
            Youth Career: His early years in football at Sporting CP's youth
            academy showcased his immense potential, leading to his professional
            debut at a young age.
          </p>

          <h3>Remarkable Achievements:</h3>

          <p>
            Manchester United Era: Ronaldo's move to Manchester United in 2003
            marked a turning point in his career, where he honed his skills
            under the guidance of Sir Alex Ferguson and won multiple titles,
            including three Premier League titles and a UEFA Champions League
            trophy.
          </p>

          <p>
            Real Madrid Dominance: His transfer to Real Madrid in 2009 shattered
            transfer records, and Ronaldo's prolific goal-scoring abilities
            helped secure four Champions League titles and numerous individual
            accolades.
          </p>

          <p>
            Return to Manchester United: In 2021, Cristiano Ronaldo made a
            triumphant return to Manchester United, rekindling the magic with
            the club and adding to his storied legacy.
          </p>

          <p>
            International Success: Ronaldo's impact extends beyond club
            football, with his role as Portugal's all-time leading scorer and
            his leadership in securing the 2016 UEFA European Championship and
            the 2019 UEFA Nations League.
          </p>

          <h3>Impact and Legacy:</h3>

          <p>
            Global Icon: Ronaldo's influence transcends the football pitch,
            making him a global icon admired for his dedication, work ethic, and
            philanthropic efforts.
          </p>

          <p>
            Role Model: His journey from humble beginnings to international
            stardom serves as an inspiration to aspiring athletes worldwide,
            emphasizing the importance of hard work and perseverance.
          </p>

          <p>
            Philanthropy: Ronaldo's charitable contributions, including
            donations to various causes and his support for children's
            hospitals, demonstrate his commitment to giving back to society.
          </p>

          <p>
            Enduring Popularity: His immense popularity on social media and as a
            brand ambassador for multiple companies underscores his lasting
            impact on popular culture.
          </p>

          <h3>Conclusion:</h3>

          <p>
            Cristiano Ronaldo's journey from a small island in Portugal to the
            pinnacle of world football is a testament to his unparalleled skill,
            determination, and dedication. His legacy serves as a reminder that
            greatness can be achieved through hard work and resilience.
          </p>

          <p>
            As we celebrate the achievements of Cristiano Ronaldo, let us draw
            inspiration from his story and strive for excellence in our own
            endeavors, reminding us that the pursuit of greatness knows no
            bounds.
          </p>
        </div>
      </section>
      {showinput && (
        <div className="input">
          <Findinput
            handlecloseinput={handlecloseinput}
            handleinputchange={handleinputchange}
            handleleftarrow={handleleftarrow}
            handlerightarrrow={handlerightarrrow}
            currentindex={currentindex}
            totaltextmatches={totaltextmatches}
            inputdata={inputdata}
          />
        </div>
      )}
    </>
  );
};
