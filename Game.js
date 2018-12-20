class Game {
  constructor(start) {
    this.stats = new Statistics();
    this.wallet = new Wallet(start);

    // ------------- HTML ELEMENTS ---------------------------
    this.boards = [...document.querySelectorAll('div.color')];
    this.inputBid = document.getElementById('bid');

    //-------------- BUTTON ----------------------------------
    document.getElementById('start').addEventListener('click', this.startGame.bind(this));

    //-------------- HTML RESULTS ELEM-----------------------
    this.spanWallet = document.querySelector('.panel span.wallet');
    this.spanResult = document.querySelector('.score span.result');
    this.spanGames = document.querySelector('.score span.number');
    this.spanWins = document.querySelector('.score span.win');
    this.spanLosses = document.querySelector('.score span.loss');

    this.render();
  }

  //----------------- RENDER DEFAULT VALUES--------------------
  render(colors = ['grey', 'grey', 'grey'], money = this.wallet.getWalletValue(), result = "", stats = [0, 0, 0], bid = 0, wonMoney = 0) {

    this.boards.forEach((board, index) => {
      board.style.backgroundColor = colors[index];
    })

    this.spanWallet.textContent = money + ' zł';

    if (result) {
      result = `Wygrana ${wonMoney} zł`;
      this.spanResult.style.color = "green";
    } else if (!result && result !== "") {
      result = `Przegrana ${bid} zł`;
      this.spanResult.style.color = "red";
    }

    this.spanResult.textContent = result;
    this.spanGames.textContent = stats[0];
    this.spanWins.textContent = stats[1];
    this.spanLosses.textContent = stats[2];
  }

  //-------------------RENDER GAME RESULTS---------------------
  startGame() {
    if (this.inputBid.value < 1) return alert('Kwota zbyt niska');

    const bid = Math.floor(this.inputBid.value);

    if (!this.wallet.checkCanPlay(bid)) {
      return alert("Masz za mało środków lub podana została nieprawidłowa wartość.");
    }

    this.wallet.changeWallet(bid, "-");
    this.draw = new Draw();

    const colors = this.draw.getDrawResult();
    const win = Result.checkWinner(colors);
    const wonMoney = Result.moneyWonInGame(win, bid);

    this.wallet.changeWallet(wonMoney);
    this.stats.addGameToStatistics(win, bid);

    this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics(), bid, wonMoney)

    this.inputBid.value = "";
  }
}