class Wallet {
  constructor(money) {
    let _money = money;

    this.getWalletValue = () => _money;

    this.checkCanPlay = value => value <= _money ? true : false;

    this.changeWallet = (value, type = "+") => {
      if (typeof value === "number" && !isNaN(value)) {
        if (type === "+") _money += value;
        else if (type === "-") _money -= value;
        else {
          throw new Error("Nieprawidłowy typ działania");
        }
      } else {
        throw new Error("Nieprawidłowa liczba");
      }

    }
  }
}


