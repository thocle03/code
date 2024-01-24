document.addEventListener('DOMContentLoaded', getExchangeRates);

function getExchangeRates() {
    const apiKey = 'YOUR_API_KEY';
    const baseCurrency = 'USD'; // Monnaie de base
    const apiUrl = `https://open.er-api.com/v6/latest/${baseCurrency}?apikey=${apiKey}`;

    // Effectuer la requête à l'API avec fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayExchangeRates(data))
        .catch(error => console.error('Erreur lors de la récupération des taux de change :', error));
}

function displayExchangeRates(data) {
    const exchangeRatesDiv = document.getElementById('exchangeRates');
    exchangeRatesDiv.innerHTML = '<h2>Taux de change actuels :</h2>';

    // Afficher les taux de change dans la page
    const rates = data.rates;
    for (const currency in rates) {
        const rate = rates[currency];
        exchangeRatesDiv.innerHTML += `<p>${currency}: ${rate}</p>`;
    }
}