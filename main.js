//Set Words For Each Level
let easyWords = ["when", "done", "it", "then", "on", "in", "with", "yes", "no", "have"];
let normalWords = ["name", "edit", "like", "success", "outline", "colour", "people", "scroll", "words", "video"];
let hardWords = ["delicious", "beautifull", "international", "universal", "graphical", "fundamental", "password", "encryption", "termination", "confiramation"];
//Set Duration Time For Each Level
let easyDuration = 5;
let normalDuration = 3;
let hardDuration = 2;
//Select Elements
let instructionBtn = document.querySelector(".game-options .game-info");
let levelBtn = document.querySelectorAll(".game-levels button");
let startBtn = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let upcomingWHolder = document.querySelector(".upcoming-words");
let wordInput = document.querySelector("input");
let timer = document.querySelector(".time span");
let remaining = document.querySelector(".remaining span");
let finished = document.querySelector(".finished");
let totalScore = document.querySelector(".finished span");
let reloadBtn = document.querySelector(".reload");
let footer = document.querySelector("footer");

//Helpful Variables
let clickedLevel = "normal";
let wordsArr = normalWords;
let timerDuration;
let score = 0;
let wordsNumber = normalWords.length;


//When Click On How To Play Button
instructionBtn.onclick = () => {
    instructions();

}
//When Click On Any Level Button
levelBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        levelBtn.forEach((el) => {
            if (el.classList.contains("clicked")) {
                el.classList.remove("clicked");

            }
        })

        btn.classList.add("clicked");
        clickedLevel = (btn.innerHTML).toLowerCase();

        wordsNumber = clickedLevel === "easy" ? easyWords.length : clickedLevel === "normal" ? normalWords.length : hardWords.length;


    });
});
//When Click On Reload Btn
reloadBtn.onclick = () => {
    location.reload();
}
//Start Button Events
startBtn.onclick = () => {
    //Show Remaining Words
    remaining.innerHTML = chooseArr().length - 1;
    pickAndShow(chooseArr());

    wordInput.focus();
    //Prevent Paste
    wordInput.onpaste = () => {
        return false;
    }
    //Hide Rest Levels Button
    levelBtn.forEach((el) => {
        el.style.cursor = "default";
        if (!el.classList.contains("clicked")) {
            el.style.display = "none";
        }
    });
    timerAndScore();
    startBtn.remove();
};

//Create Game Instructions
function instructions() {
    let div = document.createElement("div");
    div.className = "instructions";
    let explain = document.createTextNode(`In this game you will test your typing speed in three levels: `);
    div.appendChild(explain);
    let numOfLsWords = [easyWords.length, normalWords.length, hardWords.length];
    let durations = [easyDuration, normalDuration, hardDuration];
    let levelsNames = ["easy", "normal", "hard"];
    for (let i = 0; i < numOfLsWords.length; i++) {
        let p = document.createElement("p");
        let levelText = document.createTextNode(`In ${levelsNames[i]} Level you have to write every word of the`);
        let numOfwords = document.createElement("span");
        numOfwords.appendChild(document.createTextNode(` ${numOfLsWords[i]} `));
        let durNum = document.createElement("span");
        durNum.appendChild(document.createTextNode(` ${durations[i]}`));
        p.appendChild(levelText);
        p.appendChild(numOfwords);
        p.appendChild(document.createTextNode(`words in less than`));
        p.appendChild(durNum);
        p.appendChild(document.createTextNode(` Seconds.`));
        div.appendChild(p);
    }
    let closeBtn = document.createElement("span");
    closeBtn.appendChild(document.createTextNode("X"));
    div.appendChild(closeBtn);
    let overlay = document.createElement("div");
    overlay.className = "overlay"
    document.body.appendChild(overlay);
    document.body.appendChild(div);
    //Close Button Control
    closeBtn.onclick = () => {
        closeBtn.parentElement.remove();
        overlay.remove();
    }

}

//choose the Words Array 
function chooseArr() {
    wordsArr = clickedLevel === "easy" ? easyWords : clickedLevel === "normal" ? normalWords : hardWords;
    return wordsArr;
}
//Pick A Random Word From the Array And Show Upcoming Words
function pickAndShow(arr) {

    //Empty the upcoming Words Holder
    upcomingWHolder.innerHTML = "";
    //Pick And Show The Random Word 
    let randomIndex = Math.floor(Math.random() * arr.length);
    theWord.innerHTML = arr[randomIndex];
    arr.splice(randomIndex, 1);
    //Show Upcoming Words
    for (let i = 0; i < arr.length; i++) {
        let h5 = document.createElement("h5");
        h5.appendChild(document.createTextNode(arr[i]));
        upcomingWHolder.appendChild(h5);
    }
    footer.style.opacity = "0";
}
//Check End Of Words
function nextAndFinish(arr) {

    if (arr.length === 0) {
        theWord.remove();
        wordInput.remove();
        upcomingWHolder.remove();
        remaining.parentElement.parentElement.remove();
        reloadBtn.style.display = "block";
        if (score === wordsNumber) {
            finished.innerHTML = `<span>Great!</span> You Write All  the <span>${score}</span>Words `;
            finished.classList.add("success");
        } else {
            finished.innerHTML = `<span>Bad!</span> You Write <span>${score}</span> Words of  the ${wordsNumber}Words Correctly `;
            finished.classList.add("bad");
        }
        footer.style.opacity = "1";
    } else {
        remaining.innerHTML = parseInt(remaining.innerHTML) - 1;
        pickAndShow(chooseArr());
        timerAndScore();
    }

}
//Timer And Score 
function timerAndScore() {

    let duration = wordsArr = clickedLevel === "easy" ? easyDuration : clickedLevel === "normal" ? normalDuration : hardDuration;
    let timerInterval = setInterval(() => {
        timer.innerHTML = duration;
        duration--;
        if (duration < 0) {
            clearInterval(timerInterval);
            if ((wordInput.value).toLowerCase() === theWord.innerHTML) {
                score++;
            }
            wordInput.value = "";

            nextAndFinish(chooseArr());

        }
    }, 1000);
}