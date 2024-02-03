
class Product{
  constructor(id, name, price, image){
    this.id=id;
    this.name=name;
    this.price=price;
    this.image=image;
  }
}

const homeShirt = new Product (1,"Camiseta titular", 45000,"https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwb9d3e552/products/PU606527-04/PU606527-04-1.JPG");
const awayShirt = new Product (2,"Camiseta Suplente", 45000, "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwfcbb2b32/products/PU776948-02/PU776948-02-1.JPG");
const short = new Product (3,"Short", 25000,"https://i.ebayimg.com/images/g/cmYAAOSwwmBkTwZF/s-l1200.webp");
const medias = new Product (4,"Medias", 15000, "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw6dcfe8b2/products/PU771583-01/PU771583-01-1.JPG");

let arrayProducts = [homeShirt, awayShirt, short, medias];

let cartProducts = [];

function createCard (){
  const containerCard = document.getElementById("containerCard");
  containerCard.innerHTML='';
  arrayProducts.forEach(product =>{
  const div = document.createElement("div");
  div.className = "card";
  
  div.innerHTML = `
                      <img class="card-img" src="${product.image}" alt="product-img">
                      <div class="card-flex">
                      <h3>${product.name}</h3>
                      <p>$${product.price}</p>
                      <button onclick="addCart(${product.id})">Comprar</button>
                      </div>
                    `
    
    containerCard.appendChild(div);  
  })

  initializeCart();
  updateCart();
}

function addCart(idProducto){
  
  const selectedProductIndex = cartProducts.findIndex(product => product.id === idProducto);

  console.log (selectedProductIndex)

  if (selectedProductIndex >= 0) {
    cartProducts[selectedProductIndex].quantity = (cartProducts[selectedProductIndex].quantity || 1) + 1;
  } else {
    const selectedProduct = arrayProducts.find(product => product.id === idProducto);
    selectedProduct.quantity = 1;
    cartProducts.push(selectedProduct);
    }

  Toastify({
    text: "The product was added to the cart",
    duration: 3000,
    gravity: "top",
    position: "right", 
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
    
  
  updateCart();
}
  
function updateCart(){
  const cartProductsJSON = JSON.stringify(cartProducts);
      
  localStorage.setItem ("cart", cartProductsJSON);
      
  const storagedCart = localStorage.getItem("cart");

  const cartObject = JSON.parse (storagedCart);

  const containerCart = document.getElementById("containerCart");
  containerCart.innerHTML = "";
  cartObject.forEach(product =>{
  let div = document.createElement("div");
  div.className = "card";
  div.innerHTML += `  
                        <img class="card-img" src="${product.image}" alt="product-img">
                        <div class="card-flex">
                          <h3>${product.name}</h3>
                          <p>$${product.price} x ${product.quantity}</p>
                          <button onclick="removeCart(${product.id})">Eliminar</button>
                        </div>
                        `;
    
  containerCart.appendChild(div);
  })       

  getTotal();
}

function getTotal(){
  const containerTotal = document.getElementById("total");
  const total = cartProducts.reduce((total,product) => total + product.price * product.quantity, 0)
  containerTotal.innerHTML=`
                            <p>TOTAL: $${total}</p>
                            `;
}

function initializeCart() {
  const storagedCart = localStorage.getItem("cart");
  if (storagedCart) {
    cartProducts = JSON.parse(storagedCart);
  }
}

function removeCart(idProducto){
  const selectedProductIndex = cartProducts.findIndex(product => product.id === idProducto);

  if (selectedProductIndex >= 0) {
    cartProducts[selectedProductIndex].quantity -= 1;
  
  if (cartProducts[selectedProductIndex].quantity === 0){
    cartProducts.splice(selectedProductIndex, 1);
  }
}
  Toastify({
    text: "The product was removed from the cart",
    duration: 3000,
    gravity: "top",
    position: "right", 
    style: {
      background: "linear-gradient(to right, #FF0000, #FF7878)",
    },
  }).showToast();
  
  updateCart();
}

createCard ();

const urlPosiciones = "https://v3.football.api-sports.io/standings?league=128&season=2024";
const urlFixture = "https://v3.football.api-sports.io/fixtures?league=128&season=2024&team=453"
const container = document.getElementById("futbol");

fetch(urlFixture, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "b87cccf3972083898b10f66abbd3b5b5"
	}
})
.then(response => response.json())
.then((result)=>{
	console.log(result.response);
	mostrarFixture(result.response);
})
.catch(err => {
	console.log(err);
});

function mostrarFixture (fixture){
	const league = fixture[0].league.name;

	container.querySelector(".fixture").innerHTML +=`
	<h3 class="title-next-match">FIXTURE</h3>
	<h4>${league}</h4>
	<div class="fixture-scroll">
	`

	fixture.forEach(fechas=>{
		const fecha = fechas.league.round;
		const teams = fechas.teams;
		const date = fechas.fixture.date;
		const stadium = fechas.fixture.venue;
		const referee = fechas.fixture.referee;

		container.querySelector(".fixture .fixture-scroll").innerHTML += `
      <div class="fecha-box"
        <h4> ${fecha} </h4>
        <div class="teams-box">
          <div class="local-team">
            <div>
            <img src="${teams.home.logo}" class="team-logo" alt="equipo local"> ${teams.home.name}
            </div>
          </div>
          <div class="versus">
            <div>X</div>
          </div>
          <div class="away-team" style= "margin-bottom: 10px;">
            <div>
            <img src="${teams.away.logo}" class="team-logo" alt="equipo visitante"> ${teams.away.name}
            </div>
          </div>
        </div>
        <div class="match-details">
          <div>${date}</div>
          <div>${stadium.name}</div>
          <div>${stadium.city}</div>
          <div>${referee}</div>
        </div>
      </div>
		`
		container.querySelector(".fixture").innerHTML +=`
			</div>
		</div>
		`;
	})
}

fetch(urlPosiciones, {
  method: "GET",
  headers: {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": "b87cccf3972083898b10f66abbd3b5b5",
  },
})
  .then((response) => response.json())
  .then((data) => {
		console.log (data);
		const league = data.response[0].league;
		const standings = data.response[0].league.standings[0];
		listarEquipos(league, standings);
  })
  .catch((err) => console.log(err));

function listarEquipos(league, standings) {

	container.querySelector(".positions").innerHTML += `
	<h3 class="title-next-match">POSICIONES</h4>
	<h4>${league.name}</h2>
	`;

  container.querySelector(".positions").innerHTML += `
	<div class="scrollable-table">
    <table class="table-positions">
      <thead>
        <tr>
          <th>POS</th>
          <th>NAME</th>
          <th>PJ</th>
          <th>PTS</th>
          <th>DG</th>
        </tr>
      </thead>
      <tbody>
  `;

	standings.forEach((teamData) => {

		const rank=teamData.rank;
		const logo = teamData.team.logo
		const teamName = teamData.team.name;
		const played = teamData.all.played;
		const points = teamData.points;
		const goalDiff = teamData.goalsDiff;


		container.querySelector(".scrollable-table table tbody").innerHTML += `
			<tr>
				<td>${rank}</td>
				<td class="team-name"> <img class="team-logo" src="${logo}" alt="team-logo"> ${teamName}</td>
				<td>${played}</td>
				<td>${points}</td>
				<td>${goalDiff}</td>
			</tr>
		`
  });

	container.innerHTML += `
      </tbody>
    </table>
	</div>
  `
}