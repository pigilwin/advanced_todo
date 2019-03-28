export default class StoreHelpers {

  /**
   * Fetch all chosen keys from array containing objects
   * @param {Array<object>} arr
   * @param {string} key
   * @return {Array<string|number>}
   */
  static fetchAllKeyValues(arr, key) {
    let keyValues = [];

    arr.forEach((obj) => {
      if (obj.hasOwnProperty(key)) {
        keyValues.push(obj[key]);
      }
    });

    return keyValues;
  }
}