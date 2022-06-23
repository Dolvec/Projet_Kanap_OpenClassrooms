// Creation de la liste produit
let listeProduit = [];

// Association de la liste produit avec les produit de l'api
const fletchKanap = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
      listeProduit = promise
      console.table(listeProduit);
    })
};

// Récuperation donnée API pour mise en tableau, tableau utilisé pour la mise en forme dans l'Id items
const listeKanap = async () => {
  await fletchKanap();
  document
    .getElementById('items')
    .innerHTML = listeProduit.map((kanap) => `
        <a href="./product.html?${kanap._id}">
            <article>
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
              <h3 class="productName">${kanap.name}</h3>
              <p class="productDescription">${kanap.description}</p>
            </article>
          </a>
        `
    )
      // Suppression virgule ajouté par map
      .join('');


};

listeKanap();

