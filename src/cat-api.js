
export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => data.map(breed => ({ id: breed.id, name: breed.name })))
    .catch(error => {
      console.error('Error fetching breeds:', error);
      return [];
    });
}


export function fetchCatByBreed(breedId) {
  const BASE_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_JnFRMOzGTO4ryjLp8pNYcImq7oeNXrAII0GkIylbiZplQgFxhVvgzE7RrR8fguia`;

  return fetch(BASE_URL)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const cat = data[0];
        return {
          breed: cat.breeds[0].name,
          description: cat.breeds[0].description,
          temperament: cat.breeds[0].temperament,
          image: cat.url
        };
      } else {
        throw new Error('No cat data found');
      }
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      throw error;
    });
}

