export default class SystemInformation {

  /**
   * Get the page name
   * @return {Promise<any>}
   */
  static getPageName () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Advanced Todo');
      });
    });
  }

  /**
   * Get the page status
   * @return {Promise<any>}
   */
  static getPageStatus () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Active');
      });
    });
  }
}