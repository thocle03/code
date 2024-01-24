let product = ["banane", "aspirateur", "zebre", "telephone", "bouteille"];
let price = [4, 8, 6, 898, 5];
let money = prompt("Combien d'argent vous avez ?");
let panier = [];
var xhr = new XMLHttpRequest();
let want = "USD"
let have = "EUR"

document.addEventListener('DOMContentLoaded', getExchangeRates);

function getExchangeRates() {
    const apiKey = 'gFNcacKBJnQYcfqC2tiA0g==s71N5tTWrsyz1oUd';
    const baseCurrency = 'USD';
    const apiUrl = `https://open.er-api.com/v6/latest/${baseCurrency}?apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayExchangeRates(data))
        .catch(error => console.error('Erreur lors de la récupération des taux de change :', error));
}

function displayExchangeRates(data) {
    let exchangeRates = document.getElementById('exchangeRates');
    console.log('Taux de change actuels :');

    const rates = data.rates;
    for (const currency in rates) {
        const rate = rates[currency];
        exchangeRates += `${currency}: ${rate}`;

    }
    console.log(exchangeRates + " ");
}

function convertCurrency() {
    const apiKey = 'YOUR_API_KEY';
    const baseCurrency = 'EUR';
    const targetCurrency = 'USD';
    const apiUrl = `https://open.er-api.com/v6/latest/${baseCurrency}?apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[targetCurrency];
            const amountInDollars = money * exchangeRate;
            displayResult(money, amountInDollars, targetCurrency);
        })
        .catch(error => console.error('Erreur lors de la conversion de la devise :', error));
}
function displayResult(money, amountInDollars, targetCurrency) {
    
    let moneyDollars = 0;
    moneyDollars = console.log(money + ' euros équivalent à environ ' + amountInDollars + targetCurrency);
    
}
if (money != 0) {
    console.log("vous avez injecté " + money + "€");
}
else {
    console.log("Veillez mettre de l'argent afin de pouvoir effectuer des achats et acceder a votre panier");
}
let consulting = prompt("Voulez vous acceder à votre compte banquaire ?");
do {
    if (consulting == "oui") {
        let consultSold = prompt("voulez vous consulter votre solde");
        if (consultSold == "oui") {
            console.log(money + " €");
            want = prompt("Quelle type de monnaie?")
            xhr.open('GET', `https://api.api-ninjas.com/v1/convertcurrency?want=${want}&have=${have}&amount=${money}`, true);
            xhr.setRequestHeader('X-Api-Key', 'gFNcacKBJnQYcfqC2tiA0g==s71N5tTWrsyz1oUd');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log(JSON.parse(xhr.responseText));
                } else {
                    console.error('Error: ', xhr.responseText);
                }
            };
            xhr.send();
        }
        let injectSold = prompt("voulez vous remettre de l'argent ?");
        if (injectSold == "oui") {
            let newMoney = 0;
            newMoney = prompt("Combien d'argent vous voulez rajouter ?");
            money = parseInt(newMoney) + parseInt(money);
            console.log(money);
        }
        let removeSold = prompt("voulez vous enlever de l'argent ?");
        if (removeSold == "oui") {
            let oldMoney = 0;
            oldMoney = prompt("Combien d'argent vous voulez enlever ?");
            if (oldMoney - money > 0) {
                money -= oldMoney;
            }
            console.log(money);
        }
        consulting = prompt("Voulez vous toujours acceder à votre compte banquaire ?");
    }

} while (consulting == "oui");


function startShopping() {

    for (let i = 0; i < product.length; i++) {
        console.log("Prduit n°" + (i + 1) + " " + product[i] + " " + price[i] + "€");
    }
    if (money > 0) {
        let ajoutArticle = prompt("Voulez vous ajouter un article au panier ?")
        if (ajoutArticle == "oui") {
            addProduct();
        }
    }
    else {
        console.log("Tu n'as pas d'argent, tu ne peux donc rien ajouter a ton panier");
    }

}
function addProduct() {
    let choiceProduct = prompt("entrez un numéro de produit a ajouter au panier");
    if (money > price[choiceProduct]) {
        panier.push(choiceProduct - 1);
    }
    else {
        console.log("tu n'as pas assez d'argent !");
    }

    console.log("Votre panier");
    if (product[choiceProduct - 1] != "") {
        for (let numeroProduit = 0; numeroProduit < panier.length; numeroProduit++) {
            console.log("Produit n°" + (panier[numeroProduit] + 1) + " " + (product[panier[numeroProduit]]) + " " + price[panier[numeroProduit]] + " €");
        }
        console.log("votre solde s'élève à " + money + "€");
    }
    ajoutArticle = prompt("Voulez vous encore ajouter un article au panier ?")
    if (ajoutArticle == "oui") {
        addProduct();
    }
    else {
        let valider = prompt("voulez vous valider votre panier");
        if (valider == "oui") {
            let total = 0;
            for (let numeroPrix = 0; numeroPrix < panier.length; numeroPrix++) {
                total += price[panier[numeroPrix]];
            }
            console.log("Votre panier coûte au total : " + total + "€");
            money -= total;
            console.log("il vous reste :" + money + "€");
            if (money > 0) {
                startShopping();
            }
        }
    }
    consulting = prompt("Voulez vous réacceder à votre compte ?");
}

startShopping();
convertCurrency();