let gaming = new Audio("playing.mp3")
gaming.loop = true
gaming.play()
function Getname(get_name1, get_name2) {
  this.player1 = get_name1,
    this.player2 = get_name2
}


let chance_info = document.getElementById('info')
let game_over = false;
let starting_text = "X";
let moves = 0
let name_p1 = document.getElementById('player1')
let name_p2 = document.getElementById('player2')
let score_p1 = document.getElementById('score_p1')
let score_p2 = document.getElementById('score_p2')

let score_pl1 = 0
let score_pl2 = 0

let comp_score = 0




const changeText = () => {
  return starting_text === "X" ? "O" : "X";
};



//Win Status
const checkWin = () => {
  let text_win = document.getElementsByClassName("text");
  let win_arr = [
    [0, 1, 2, 0, -8.2, 0],
    [3, 4, 5, 0, 0, 0],
    [6, 7, 8, 0, 8.31, 0],
    [0, 3, 6, -8.31, -3, 90],
    [1, 4, 7, 0, 0, 90],
    [2, 5, 8, 8.31, 0, 90],
    [0, 4, 8, 0, 0, 45],
    [2, 4, 6, 0, 0, 135],
  ];
  win_arr.forEach((wins) => {
    if (
      text_win[wins[0]].innerHTML === text_win[wins[1]].innerHTML &&
      text_win[wins[2]].innerHTML === text_win[wins[1]].innerHTML &&
      text_win[wins[0]].innerHTML !== ""
    ) {
      let line = document.querySelector(".win-line");
      line.style.transform = `translate(${wins[3]}rem, ${wins[4]}rem) rotate(${wins[5]}deg)`;
      line.style.width = "25rem";
      game_over = true
    }
  });
};


//Game play
let friends_play = false
const friendsPlay = () => {
  let name_1 = document.getElementById("name1").value;
  let name_2 = document.getElementById("name2").value;
  const pl1 = new Getname(name_1, name_2)
  name_p1.innerHTML = pl1.player1
  name_p2.innerHTML = pl1.player2
  if (starting_text === "X") {
    chance_info.innerHTML = `${pl1.player1}'s (${starting_text}) Turn`;
  } else {
    chance_info.innerHTML = `${pl1.player2}'s (${starting_text}) Turn`;
  }
  let getBox = document.querySelectorAll(".box");
  getBox.forEach((data) => {
    let getText = data.querySelector(".text");
    data.addEventListener("click", print);
    function print() {
      if (getText.innerHTML === "") {
        getText.innerHTML = starting_text;
        starting_text = changeText();
        moves++
        checkWin();

        if (game_over) {
          if (starting_text === "X") {
            let name_2 = document.getElementById('name2').value
            chance_info.innerHTML = `${name_2} Wins`
            score_pl2++
            score_p2.innerHTML = score_pl2
          }
          else {
            let name_1 = document.getElementById('name1').value
            chance_info.innerHTML = `${name_1} Wins`
            score_pl1++
            score_p1.innerHTML = score_pl1
          }
        }
        else if (!game_over) {
          if (moves == 9) {
            chance_info.innerHTML = "Draw!"
          }
          else {
            let name_1 = document.getElementById("name1").value;
            let name_2 = document.getElementById("name2").value;
            let current_name = starting_text === "X" ? name_1 : name_2;
            chance_info.innerHTML = `${current_name}'s (${starting_text}) Turn`;
          }
        }
      }
    }
  });
};


const getRandomEmptyBox = () => {
  const emptyBoxes = document.querySelectorAll(".box .text:empty");
  if (emptyBoxes.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    return emptyBoxes[randomIndex].parentElement;
  }
  return null;
};


function Get_player(name) {
  this.com_player = name
}

//computer vs player
let computer_play = false
const computerPlay = () => {
  const emptyBox = getRandomEmptyBox();
  console.log(emptyBox)
  let player = document.getElementById('player').value
  const player_name = new Get_player(player)
  name_p1.innerHTML = player_name.com_player
  name_p2.innerHTML = "Computer"
  if (starting_text === "X") {
    chance_info.innerHTML = `${player_name.com_player}'s (O) Turn`;
  }
  else {
    chance_info.innerHTML = `${player_name.com_player}'s (X) Turn`;
  }
  if (emptyBox) {
    const computerText = starting_text;
    const computerBox = emptyBox.querySelector(".text");
    computerBox.innerHTML = computerText;
    starting_text = changeText();
    moves++;
    checkWin();

    if (game_over) {
      chance_info.innerHTML = "Computer Wins"
      comp_score++
      score_p2.innerHTML = comp_score
    }
    else if (!game_over) {
      if (moves === 9) {
        chance_info.innerHTML = "Draw!";
      } else {
        let getBox = document.querySelectorAll(".box");
        getBox.forEach((data) => {
          let getText = data.querySelector(".text");
          data.addEventListener("click", comPrint);
          function comPrint() {
            if (getText.innerHTML === "") {
              getText.innerHTML = starting_text;
              starting_text = changeText();
              moves++;
              checkWin();
              if (game_over) {
                chance_info.innerHTML = `${player_name.com_player} Wins`
                score_pl1++
                score_p1.innerHTML = score_pl1
              }
              else if (!game_over) {
                if (moves == 9) {
                  chance_info.innerHTML = "Draw!"
                }
                else {
                  computerPlay()
                }
              }
            }
          }
        })
      }
    }
  }
}




document.getElementById('friends').addEventListener('click', () => {
  document.getElementById("selection").style.display = "none";
  document.getElementById("card").style.display = "flex";
})

document.getElementById('computer').addEventListener('click', () => {
  document.getElementById("selection").style.display = "none";
  document.getElementById('com-card').style.display = "flex"
})

document.getElementById('start_2').addEventListener('click', () => {
  document.getElementById('com-card').style.display = "none"
  document.querySelector('.heading').style.display = "none"
  document.getElementById("board").style.display = "flex";
  computer_play = true
  computerPlay()
})

document.getElementById('start').addEventListener('click', () => {
  document.getElementById("card").style.display = "none";
  document.querySelector('.heading').style.display = "none"
  document.getElementById("board").style.display = "flex";
  friends_play = true
  friendsPlay()
})

document.getElementById('reset').addEventListener('click', () => {
  let clear_text = document.querySelectorAll(".text");
  let line = document.querySelector(".win-line");
  line.style.width = "0rem";
  moves = 0
  clear_text.forEach((clear) => {
    clear.innerHTML = "";
  });

  if (computer_play === true && game_over === false) {
    computerPlay()
  }

  else if (computer_play === true && game_over === true) {
    game_over = false
    computerPlay()
  }

  else if (friends_play === true && game_over === false) {
    starting_text = changeText()
    friendsPlay()
  }

  else if (friends_play === true && game_over === true) {
    game_over = false
    starting_text = changeText()
    friendsPlay()
  }
})

document.getElementById('new_game').addEventListener('click', () => {
  location.reload()
})
