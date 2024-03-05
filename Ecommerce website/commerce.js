const bar=document.getElementById('bar');
const nav=document.getElementById('navbar');
const close= document.getElementById('close')

if (bar)
{
    bar.addEventListener('click',() =>{
        nav.classList.add('active');
    })
}

if (close){
    close.addEventListener('click',() =>{
        nav.classList.remove('active');
    })
}


//Cart page
let cartIcon=document.querySelector("#cart-icon");
let cart=document.querySelector(".cart");
let closeCart=document.querySelector("#close-cart");
//Open cart
cartIcon.onclick= () =>{
    cart.classList.add("cart-active");
}
//close Cart
closeCart.onclick= () =>{
    cart.classList.remove("cart-active");
}

//Cart Working
document.addEventListener('DOMContentLoaded',ready)

function ready(){
    loadContent();
  
}

function loadContent(){
    //REMOVE items from cart
    let btnRemove = document.querySelectorAll('.cart-remove')
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem)
    });

    //Product Item Change Event
    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
      input.addEventListener('change',changeQty)
    });

    //Product cart
    let cartBtns = document.querySelectorAll('#add-cart')
    cartBtns.forEach((btn)=>{
     btn.addEventListener('click',addCart);
    });

    updateTotal();
}


//Remove item
function removeItem(){
    if(confirm('Are Your Sure to Remove')){
      let title=this.parentElement.querySelector('.cart-product-title').innerHTML;
      itemList=itemList.filter(el=>el.title!=title);
      this.parentElement.remove();
    }
    updateTotal()
  }

  //Change Quantity
  function changeQty(event){
    var input= event.target;
    if(isNaN(input.value) || input.value <= 0 ){
      input.value= 1;
    }
    updateTotal();
  }

  let itemList=[];

//Add Cart
function addCart(){
 let item=this.parentElement;
 let title=item.querySelector('.product-title').innerHTML;
 let price=item.querySelector('.product-price').innerHTML;
 let imgSrc=item.querySelector('.product-img').src;
 //console.log(title,price,imgSrc);
 let newProduct={title,price,imgSrc}

 //Check Product already Exist in Cart
 if(itemList.find((el)=>el.title==newProduct.title)){
  alert("Product Already added in Cart");
  return;
 }else{
  itemList.push(newProduct);
 }


let newProductElement= createCartProduct(title,price,imgSrc);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
loadContent();
}


function createCartProduct(title,price,imgSrc){

  return `
  <div class="cart-box">
  <img src="${imgSrc}" alt="" class="cart-img">
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
       <div class="cart-amt">${price}</div>
    </div>
     <input type="number" value="1" class="cart-quantity">
    </div>

    <i class="fas fa-trash-alt cart-remove"></i>
    </div>
    `;
}



  function updateTotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total=0;
  for (var i= 0; i< cartBoxes.length; i++ ){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace('Rs.',''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    //if price contain some cents value
    total= Math.round(total*100)/ 100;

    document.getElementsByClassName('total-price')[0].innerText = 'Rs.'+ total;
  }
   
  // Add Product Count in Cart Icon

  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }
}


   