class Cache {
  constructor() {
    this.tbl = {};
  }

  read(key) {
    return this.tbl[key];
  }

  write(key, prop) {
    this.tbl[key] = prop;
  }
}

module.exports = new Cache();
