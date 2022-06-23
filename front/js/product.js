const produit = window.location.search.split("?").join("");
console.log(produit);

let product = [];

const fletchDetail = async () => {
    await fetch(`http://localhost:3000/api/products/${produit}`)
        .then((res) => res.json())
        .then((promise) => {
            product = promise
            console.table(product);
        })
};

const detailKanap = async () => {
    await fletchDetail();



    document
        .getElementsByClassName('item__img')[0]
        .innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`

    document
        .getElementById('title')
        .innerHTML = `${product.name}`

    document
        .getElementById('price')
        .innerHTML = `${product.price}`

    document
        .getElementById('description')
        .innerHTML = `${product.description}`;

    // variable couleur de l'id html colors
    let couleur = document.getElementById('colors');
    console.table(product.colors);

    // récuperation tableau des couleurs
    // creation de l'element option avec assignation a let tagOption
    product.colors.forEach((couleurs) => {
        document.createElement("option");
        let tagOption = document.createElement("option");

        // creation des balise option et assignation de leur valeur via le tableau
        tagOption.innerHTML = `<option value="${couleurs}">${couleurs}</option>`;

        // donne l'enfant tagOption a couleur
        couleur.appendChild(tagOption);
    });

    panier(product);

};

detailKanap();

const panier = () => {
    let bouton = document.getElementById('addToCart');
    console.log(bouton);
    /* Ajout d'un écouteur d'événement au bouton.
     Obtenir la valeur du stockage local et la valeur de la couleur sélectionnée. */
    bouton.addEventListener('click', () => {
        let produitTableau = JSON.parse(localStorage.getItem('produit'))
        let selectColor = document.getElementById("colors");

        /* Création d'un nouvel objet avec l'objet produit et ajout de la couleur et de la quantité. */
        const nombreArticle = document.getElementById('quantity');
        const optionArticle = Object.assign({}, product, {
            colors: `${selectColor.value}`,
            nombre: `${nombreArticle.value}`
        });
        console.log('Produit ajouté au panier');

        /* Si le stockage local est vide, il crée un tableau vide et pousse l'objet produit dans
        celui ci */
        if (produitTableau == null) {
            produitTableau = [];
            produitTableau.push(optionArticle);

            localStorage.setItem("produit", JSON.stringify(produitTableau));
        }
        else if (produitTableau != null) {
            /* Vérifier si l'identifiant du produit et la couleur sont identiques. S'ils sont
            identiques, il ajoutera la quantité au produit. */
            for (i = 0; i < produitTableau.length; i++) {
                if (produitTableau[i]._id == product._id && produitTableau[i].colors == selectColor.value) {
                    return (
                        produitTableau[i].nombre = Number(produitTableau[0].nombre) + Number(`${nombreArticle.value}`),
                        localStorage.setItem('produit', JSON.stringify(produitTableau)),
                        (produitTableau = JSON.parse(localStorage.getItem("produit")))
                    )
                }
            }
            /* Vérifier si l'identifiant du produit et la couleur ne sont pas identiques. S'ils ne sont
            pas identiques, cela poussera le produit vers le stockage local. */
            for (i = 0; i < produitTableau.length; i++) {
                if (produitTableau[i]._id == product._id && produitTableau[i].colors != selectColor.value) {
                    return (
                        produitTableau.push(optionArticle),
                        localStorage.setItem('produit', JSON.stringify(produitTableau)),
                        (produitTableau = JSON.parse(localStorage.getItem('produit')))
                    );
                }
            }
            /* Vérifier si l'identifiant du produit n'est pas égal à l'identifiant du produit dans le
            stockage local. S'il n'est pas égal, il poussera le produit vers le stockage local. */
            for (i = 0; i < produitTableau.length; i++) {
                if (produitTableau[i]._id != product._id) {
                    return (
                        produitTableau.push(optionArticle),
                        localStorage.setItem('produit', JSON.stringify(produitTableau)),
                        (produitTableau = JSON.parse(localStorage.getItem('produit')))
                    );
                }
            }

        };

    });
    /* Renvoie la valeur du stockage local. */
    return (produitTableau = JSON.parse(localStorage.getItem("produit")));
}
