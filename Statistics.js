class Statistics {
  constructor() {
    this.gameResults = [];
  }

  //ADD RESULT TO STATS
  addGameToStatistics(win, bid) {
    let gameResult = {
      win: win,
      bid: bid
    }
    this.gameResults.push(gameResult);
  }

  //GET STATS
  showGameStatistics() {
    let games = this.gameResults.length;
    let wins = this.gameResults.filter(item => item.win).length;
    let losses = games - wins;
    return [games, wins, losses]
  }
}
