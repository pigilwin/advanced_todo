export default class WebStore {

  /**
   * Fetch the web contents
   * @return {Promise<Response>}
   */
  static fetchWebContents() {

    return WebStore.fetchRequest('https://my-json-server.typicode.com/pigilwin/fakedbserver/todos');
  }

  /**
   * Fetch the request
   * @param url
   * @return {Promise<any>}
   */
  static fetchRequest (url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET',url);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }
}