export default class SystemInformation {

  /**
   * Get the page name
   * @return {Promise<any>}
   */
  getPageName () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Advanced Todo');
      }, 1000);
    });
  }

  /**
   * Get the page status
   * @return {Promise<any>}
   */
  getPageStatus () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Active');
      }, 1000);
    });
  }
}