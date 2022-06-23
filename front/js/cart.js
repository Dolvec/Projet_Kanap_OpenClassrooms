
/* Obtenir la valeur de l'élément localStorage "produit" et l'analyser dans un objet JavaScript. */
let panier = JSON.parse(localStorage.getItem("produit"));
console.table(panier)

/**
 * Si la variable panier est définie, alors attendez qu'elle soit définie, puis enregistrez-la.
 */
const ajoutPanier = async () => {
  if (panier) {
    await panier;

    /* Sert à afficher le contenu du panier. */
    panierValid = document.getElementById('cart__items')
      .innerHTML = panier.map((detail) => `
      <article class="cart__item" data-id="${detail._id}" data-color="${detail.colors}">
  <div class="cart__item__img">
    <img src="${detail.imageUrl}" alt="${detail.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${detail.name}</h2>
      <p>${detail.colors}</p>
      <p>${detail.price.toLocaleString()} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" 
        value="${detail.nombre}" data-id="${detail._id}" data-color="${detail.colors}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem" data-id="${detail._id}" data-color="${detail.colors}">Supprimer</p>
      </div>
    </div>
  </div>
  </article>
  `
      )

        .join('');
    ajoutQuantity();
    supProduit();

  };

};
ajoutPanier();

/* Calcule de la quantité total de produit et prix total dans le panier */
let totalArticle = [];
let totalPrix = [];

if (panier) {
  panier.forEach((totalMeuble) => {
    totalArticle.push(totalMeuble.nombre);
    totalPrix.push(totalMeuble.price * parseFloat(totalMeuble.nombre));

  })

  let totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.textContent = `${eval(totalArticle.join("+"))}`;

  let totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = `${eval(totalPrix.join("+"))}`;

};
/* Incrementation et décrementation produit */
const ajoutQuantity = async (ajoutPanier) => {
  await ajoutPanier;

  let plus = document.querySelectorAll('.itemQuantity');
  plus.forEach((ajout) => {
    ajout.addEventListener('change', () => {

      for (i = 0; i < panier.length; i++) {
        if (panier[i]._id == ajout.dataset.id && panier[i].colors == ajout.dataset.color)
          /* Vérifier si la valeur de l'entrée est supérieure à la valeur par défaut. Si c'est le cas,
          il incrémentera la valeur de l'entrée et la valeur de la quantité dans le panier. */
          if (ajout.value > ajout.defaultValue) {
            return (
              panier[i].nombre++,
              localStorage.setItem('produit', JSON.stringify(panier)),
              (document.querySelectorAll('.itemQuantity').textContent = panier[i].nombre),
              (location.href = "cart.html")
            );
          }
          /* Vérifier si la valeur de l'entrée est inférieure ou égale à la valeur par défaut. Si c'est
          le cas, il décrémentera la valeur de l'entrée et la valeur de la quantité dans le panier. */
          else if (ajout.value <= ajout.defaultValue) {
            return (
              panier[i].nombre--,
              localStorage.setItem('produit', JSON.stringify(panier)),
              (document.querySelectorAll('.itemQuantity').textContent = panier[i].nombre),
              (location.href = "cart.html")
            );
          }
      }
    })
  })
};

/* Suppression produit */

let totalProduit = [];

const supProduit = async (ajoutPanier) => {
  await ajoutPanier;

  let sup = document.querySelectorAll('.deleteItem');

  sup.forEach((supprimer) => {
    supprimer.addEventListener('click', () => {

      let removeProduit = panier.length;

      /* Suppression de l'intégralité de l'article localStorage s'il n'y a qu'un seul article dans le
      panier. */
      if (removeProduit == 1) {
        return (
          localStorage.removeItem('produit'),
          (location.href = "cart.html")
        )
      }
      /* Filtrage du tableau d'objets dans localStorage, retrait de l'item selectionner, 
      renvoi du Json avec nouvelle valeur */
      else {
        totalProduit = panier.filter(el => {
          if (supprimer.dataset.id != el._id || supprimer.dataset.color != el.colors) {
            return true
          }
        });

        localStorage.setItem('produit', JSON.stringify(totalProduit));
        (location.href = "cart.html")
      }
    })
  })

};

/* Formulaire info commande */

const prenom = document.getElementById('firstName');
const nom = document.getElementById('lastName');
const address = document.getElementById('address');
const ville = document.getElementById('city');
const email = document.getElementById('email');

let valeurPrenom, valeurNom, valeurAdresse, valeurVille, valeurEmail;

/* Prénom */

prenom.addEventListener('input', (e) => {
  valeurPrenom;
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    firstNameErrorMsg.innerHTML = "";
    valeurPrenom = e.target.value;
  }
  else if (e.target.value.length < 3 ||
    e.target.value.length > 25 ||
    !e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    firstNameErrorMsg.innerHTML = "doit contenir entre 3 et 25 caractères et ne doit pas contenir de caractère spécial .";
    valeurPrenom = null;
  }
});

/* Nom */

nom.addEventListener('input', (e) => {
  valeurNom;
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    lastNameErrorMsg.innerHTML = "";
    valeurNom = e.target.value;
  }
  else if (e.target.value.length < 3 ||
    e.target.value.length > 25 ||
    !e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    lastNameErrorMsg.innerHTML = "doit contenir entre 3 et 25 caractères et ne doit pas contenir de caractère spécial .";
    valeurNom = null;
  }
});

/* adresse */

address.addEventListener('input', (e) => {
  valeurAdresse;
  if (e.target.value.match(/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/)) {
    addressErrorMsg.innerHTML = "";
    valeurAdresse = e.target.value;
  }
  else if (
    !e.target.value.match(/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/)) {
    addressErrorMsg.innerHTML = "doit etre du type : 40 rue des six frères Ruellan";
    valeurAdresse = null;
  }
});

/* ville */

ville.addEventListener('input', (e) => {
  valeurVille;
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    cityErrorMsg.innerHTML = "";
    valeurVille = e.target.value;
  }
  else if (e.target.value.length < 3 ||
    e.target.value.length > 25 ||
    !e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    cityErrorMsg.innerHTML = "doit contenir entre 3 et 25 caractères et ne doit pas contenir de caractère spécial .";
    valeurVille = null;
  }
});

/* email */

email.addEventListener('input', (e) => {
  valeurEmail;
  if (e.target.value.match(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/)) {
    emailErrorMsg.innerHTML = "";
    valeurEmail = e.target.value;
  }
  else if (e.target.value.length < 3 ||
    e.target.value.length > 25 ||
    !e.target.value.match(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/)) {
    emailErrorMsg.innerHTML = "doit etre du type : NormandLabrie@jourrapide.com";
    valeurEmail = null;
  }
});

/* Clic sur le bouton avec l'identifiant de la commande.
Lorsque le bouton est cliqué, il enregistre l'objet acheteur dans la console. */
function envoiFormulaire() {

  const boutonCommande = document.getElementById('order');

  boutonCommande.addEventListener('click', (e) => {

    e.preventDefault();

    const order = {
      contact: {
        firstName: prenom.value,
        lastName: nom.value,
        address: address.value,
        city: ville.value,
        email: email.value,
      },
      produits: panier,
    }
    console.log(order);

    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id=' + data.orderId;
      })
      .catch(() => {
        alert("Une erreur est survenue, merci de revenir plus tard.");
      });

  });
}
envoiFormulaire();






