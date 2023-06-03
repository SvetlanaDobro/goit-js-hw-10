import { fetchBreeds, fetchCatByBreed} from './cat-api';



const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

hideError();
showLoader();

fetchBreeds()
    .then(breeds => {
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });
          
    })
    .catch(error => {    
        showError();
        console.error('Error fetching breeds:', error);
    }).finally(() => {
        hideLoader();
    });


breedSelect.addEventListener('change', () => {
      const selectedBreedId = breedSelect.value;

    showLoader();
    hideError();
    hideCatInfo();

    fetchCatByBreed(selectedBreedId)
        .then(catData => {
            catInfo.innerHTML = `
            <img src="${catData.image}" alt="${catData.breed}">
            <h2>${catData.breed}</h2>
            <p><strong>Description:</strong> ${catData.description}</p>
            <p><strong>Temperament:</strong> ${catData.temperament}</p>
          `;
            showCatInfo();
        })
        .catch(error => {          
            showError();
            console.error('Error fetching cat:', error);
        }).finally(() => {
            hideLoader();
        });
});
    
function showLoader() {
  loader.classList.add('active');
}
    
 function hideLoader() {
      loader.classList.remove('active');
    
    }

    function showError() {
      error.classList.remove('hidden');
}

function hideError() {
  error.classList.add('hidden');
}

function showCatInfo() {
  catInfo.classList.remove('hidden');
}

function hideCatInfo() {
  catInfo.classList.add('hidden');
}













