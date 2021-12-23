class GiphsService {
  constructor(API) {
      this.API = API;
    }

    getRequestText(textInput) {
      let str = textInput.value.trim();
      return str
    }

  getResponseURL(textInput) {
      let url = `https://api.giphy.com/v1/gifs/search?api_key=${this.API}&limit=1&q=${this.getRequestText(textInput)}`;
      return fetch(url)
        .then(response => response.json())
    }
  }

export { GiphsService };