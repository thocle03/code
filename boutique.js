let product = ["banane", "aspirateur", "zebre", "telephone", "bouteille"];
let price = [4, 8, 6, 898, 5];
let money = prompt("Combien d'argent vous avez ?");
let panier = [];
console.log("vous avez injecté " + money + "$");
function startShopping() {

    for (let i = 0; i < product.length; i++) {
        console.log("Prduit n°" + (i + 1) + " " + product[i] + " " + price[i] + "$");
    }
    if (money > 0) {
        let ajoutArticle = prompt("Voulez vous ajouter un article au panier ?")
        if (ajoutArticle == "oui") {
            addProduct();
        }
    }
    else{
        console.log("Tu n'as pas d'argent, tu ne peux donc rien ajouter a ton panier");
    }
    
}
function addProduct() {
    let choiceProduct = prompt("entrez un numéro de produit a ajouter au panier");
    if (money > price[choiceProduct]) {
        panier.push(choiceProduct - 1);
    }
    else{
        console.log("tu as pas la moula sale pauvre !!");
    }
    
    console.log("Votre panier");
    if (product[choiceProduct - 1] != "") {
        for (let numeroProduit = 0; numeroProduit < panier.length; numeroProduit++) {
            console.log("Produit n°" + (panier[numeroProduit] + 1) + " " + (product[panier[numeroProduit]]) + " " + price[panier[numeroProduit]] + " $");
        }
        console.log("votre sold s'élève à " + money + "$");
    }
    ajoutArticle = prompt("Voulez vous encore ajouter un article au panier ?")
    if (ajoutArticle == "oui") {
        addProduct();
    }
    else{
        let valider = prompt("voulez vous valider votre panier");
        if (valider == "oui") {
            let total = 0;
            for (let numeroPrix = 0; numeroPrix < panier.length; numeroPrix++) {
                total += price[panier[numeroPrix]];
            }
            console.log("Votre panier coute au total : " + total + "$");
            money -= total;
            console.log("il vous reste :" + money + "$");
            if (money>0) {
                startShopping();
            }
        }
    }
    let consultSold = prompt("voulez vous consulter votre solde");
    if (consultSold == "oui") {
        console.log(money);
    }
    let injectSold = prompt("voulez vous remettre de l'argent ?");
    if (injectSold == "oui") {
        let newMoney = 0;
        newMoney = prompt("Combien d'argent vous voulez rajouter ?");
        money -= -newMoney;
        console.log(money);
    }
    let removeSold = prompt("voulez vous enlever de l'argent ?");
    if (removeSold == "oui") {
        let oldMoney = 0;
        oldMoney = prompt("Combien d'argent vous voulez enlever ?");
        money -= oldMoney;
        console.log(money);
    }
}
startShopping();

