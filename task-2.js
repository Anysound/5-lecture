class Car {
  constructor(brand, model, yearOfManufacturing, maxSpeed, maxFuelVolume, fuelConsumption) {

    if (typeof brand !== 'string' || brand.length > 50 || brand.length < 1) {
      throw new Error('brand must be a string, to have length at least 1 symbol, and no more than 50');
    }
    this.brand = brand;

    if (typeof model !== 'string' || model.length > 50 || model.length < 1) {
      throw new Error('model must be a string, to have length at least 1 symbol, and no more than 50');
    }
    this.model = model;
    
    if (typeof yearOfManufacturing !== 'number' || yearOfManufacturing < 1900 || yearOfManufacturing > new Date().getFullYear()) {
      throw new Error('year must be a number, at least be 1900, and no more than current year')
    }
    this.yearOfManufacturing = yearOfManufacturing;

    if (typeof maxSpeed !== 'number' || maxSpeed < 100 || maxSpeed > 300) {
      throw new Error('maxSpeed must be a number, at least be 100 and no more than 300')
    }
    this.maxSpeed = maxSpeed;

    if (maxFuelVolume < 10 || maxFuelVolume > 50) {
      throw new Error('maxFuelVolume must be a number, at least be 10 and no more than 50')
    }
    this.maxFuelVolume = maxFuelVolume;

    if (typeof fuelConsumption !== 'number') {
      throw new Error('fuelConsumption must be a number')
    }
    this.fuelConsumption = fuelConsumption;

    if (arguments.length < 6) {
      throw new Error('one or several parameters are missed')
    }
  }


  #brand = null;
  get brand() {
    return this.#brand;
  }
  set brand(value) {
    if (typeof value !== 'string' || value.length > 50 || value.length < 1) {
      throw new Error('brand must be a string, to have length at least 1 symbol, and no more than 50');
    }
    this.#brand = value;
  }

  #model = null;
  get model() {
    return this.#model;
  }
  set model(value) {
    if (typeof value !== 'string' || value.length > 50 || value.length < 1) {
      throw new Error('model must be a string, to have length at least 1 symbol, and have length no more than 50');
    }
    this.#model = value;
  }

  #yearOfManufacturing = null;
  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }
  set yearOfManufacturing(value) {
    if (typeof value !== 'number' || value < 1900 || value > new Date().getFullYear()) {
      throw new Error('year must be a number, at least be 1900, and no more than current year')
    }
    this.#yearOfManufacturing = value;
  }

  #maxSpeed = null;
  get maxSpeed() {
    return this.#maxSpeed;
  }
  set maxSpeed(value) {
    if (typeof value !== 'number' || value < 100 || value > 300) {
      throw new Error('maxSpeed must be a number, at least be 100 and no more than 300')
    }
    this.#maxSpeed = value;
  }

  #maxFuelVolume = null;
  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }
  set maxFuelVolume(value) {
    if (value < 10 || value > 50) {
      throw new Error('maxFuelVolume must be a number, at least be 10 and no more than 50')
    }
    this.#maxFuelVolume = value;
  }

  #fuelConsumption = null;
  get fuelConsumption() {
    return this.#fuelConsumption;
  }
  set fuelConsumption(value) {
    if (typeof value !== 'number') {
      throw new Error('fuelConsumption must be a number')
    }
    this.#fuelConsumption = value;
  }

  #isStarted = false;
  get isStarted() {
    return this.#isStarted;
  }

  #currentFuelVolume = 0;
  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  #mileage = 0;
  get mileage() {
    return this.#mileage;
  }

  start() {

    if (this.#isStarted) {
      throw new Error('Машина уже заведена');
    }
    this.#isStarted = true;
  }

  shutDownEngine() {

    if (!this.#isStarted) {
      throw new Error('Машина ещё не заведена');
    }
  }

  fillUpGasTank(amount) {

    if (typeof amount !== 'number') {
      throw new Error('Неверное количество топлива для заправки');
    } else if (amount == 0 || amount < 0) {
      throw new Error('Неверное количество топлива для заправки');
    } else if (this.maxFuelVolume < (this.#currentFuelVolume + amount)) {
      throw new Error('Топливный бак переполнен');
    } else {
      this.#currentFuelVolume += amount;
    }
  }

  drive(speed, hoursAmount) {

    const consumedFuel = (speed * hoursAmount) / 100 * this.fuelConsumption;

    if (typeof speed !== 'number' || speed < 0 || speed === 0) {
      throw new Error('Неверная скорость');
    } else if (typeof hoursAmount !== 'number' || hoursAmount < 0 || hoursAmount == 0) {
      throw new Error('Неверное количество часов');
    } else if (speed > this.#maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    } else if (!this.#isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    } else if ((this.#currentFuelVolume - consumedFuel) < 0) {
      throw new Error('Недостаточно топлива');
    } else {
      this.#mileage += (speed * hoursAmount);
      this.#currentFuelVolume -= consumedFuel;
    }
  }
}
