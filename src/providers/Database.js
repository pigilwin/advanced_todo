export default class Database {
  /**
   * @var {Database} instance
   */
  static instance;
  /**
   * Create a new storage instance
   */
  constructor () {
    if (Database.instance) {
      return Database.instance;
    }

    this.key = "TODO";
    this.storageData = this._loadData();

    Database.instance = this;
  }

  /**
   * Add and item to the store
   * @param {string} key
   * @param {object} data
   * @return {Database}
   */
  addItemToStore (key, data) {
    this.storageData[key] = data;
    this._save();
    return this;
  }

  clear () {
    this.storageData = {};
    localStorage.clear();
  }

  /**
   * Get back the internal data object
   * @return {object}
   */
  getData() {
    return this.storageData;
  }

  /**
   * Save values to local storage
   * @private
   */
  _save () {
    localStorage.setItem(this.key, JSON.stringify(this.storageData));
  }

  /**
   * Load the data
   *
   * @return {object}
   * @private
   */
  _loadData () {
    let data = JSON.parse(localStorage.getItem(this.key));
    if (data === null) {
      return {};
    }
    return data;
  }
}