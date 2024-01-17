
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
}

function addCart(idProducto){
  
  const selectedProductIndex = cartProducts.findIndex(product => product.id === idProducto);

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

createCard ();







