class GiphReactor {
  updateGiphs(giphsGallery) {
    let string = '';
    for (const key in giphsGallery) {
      let img = `
        <div class="giphs__wrapper">
          <img src="${giphsGallery[key].url}" alt="Giph" class="giphs__item" id="giphs-item"></img>
        </div>
      `;
      string += img
    }
    return string
  }
}

export { GiphReactor }