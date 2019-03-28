export default class WebStore {

  /**
   * Fetch the web contents
   * @return {Promise<Response>}
   */
  static fetchWebContents() {

    return fetch('https://my-json-server.typicode.com/pigilwin/fakedbserver/todos');
  }
}