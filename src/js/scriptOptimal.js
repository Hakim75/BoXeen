var $color = document.querySelectorAll("#color input");
var $prod = document.querySelectorAll("#prod input");
var $size = document.querySelector("select");
var $qte = document.querySelector(".increment-number input");
var $negativeButton = document.querySelector(".negativeButton");
var $positiveButton = document.querySelector(".positiveButton");
var $price = document.querySelector(".price-value input");
var $total = document.querySelector(".money input");
var $viewPrice = document.querySelector(".price-value");
var $viewTotal = document.querySelector(".money");
var $nameProduct = document.querySelector(".boxer-name");
var $detailProduct = document.querySelector("#detail");
var valColor = document.querySelector("#color input[checked]").value;
var valProd = document.querySelector("#prod input[checked]").value;
var $ContainImg = document.querySelector(".container-product-boxer-white");
var $img = document.querySelectorAll(".container-product-boxer-white img");
var $add = document.querySelector("#add");
var $command = document.querySelector("#command");
var theItem;
//var $clear = document.querySelector("#clear");

nameClass = ".st-bc";
var products = new Array();
var product1 = {
        "classe":"ll",
        "nom":"L'impressioniste",
        "prix":53.99,
        "composition":"Lin/lenpur",
        "descriptif":"L'alliance du lin et du lenpur confère au caleçon une étoffe anallergique aux propriétées thermo-régulatrice, dans un boxer d'une grande qualité. Le lenpur fibre produite sur les pin blanc du nord de la france s'allie à merveille avec le lin. Le produit fini est doux sans perdre en robustesse, élégant. "
    };
var product2 = {
    "classe":"lt",
    "nom":"L'innovant",
    "prix":56.00,
    "composition":"Lin/Tencel",
    "descriptif":"Ce boxer est une équivalent du soyeux de par la présence du Tencel. l'utilisation du lin apporte un confort d'utilisation significatif grâce à ses qualités thermo-régulatrice. Le produit fini est très doux, un boxer qui accompagnera son propriétaire en délicatesse dans les entreprises les plus hardues."
};
var product3 = {
    "classe":"cc",
    "nom":"le Brave",
    "prix":25.99,
    "composition":"Coton/chanvre",
    "descriptif":"Le tissage des fibres de chanvre et de coton permet d'apporter douceur et résistance. Le coton est issue du recyclage, une seconde vie qui est là pour vous apporter le confort que tous les braves méritent. Le produit fini est doux, robuste, hyper-confortable."
};
var product4 = {
    "classe":"st",
    "nom":"le soyeux",
    "prix":25.99,
    "composition":"soie/tencel",
    "descriptif":"L'association de la soie et du tencel donne un produit d'une qualité exceptionnelle, une étoffe soyeuse comme son nom et douce comme la pulpe d'eucalyptus dont notre tencel est issue. Le produit fini est très doux, sa présence est là pour sublimer la vôtre. "
};


products.push(product4);
products.push(product1);
products.push(product2);
products.push(product3);

$positiveButton.addEventListener("click",function(){
    $qte.value = parseInt(++$qte.value);
    calcPrice();
});
$negativeButton.addEventListener("click",function(){
    if($qte.value > 1){
        $qte.value = parseInt(--$qte.value);
        calcPrice();
    }
});


$qte.addEventListener("change",function(){
    if($qte.value == 0 || parseFloat($qte.value) == isNaN){
        $qte.value = 1; 
    }
    calcPrice();
});

for(var i=0; i<$color.length && i<$prod.length; i++){
    $prod[i].addEventListener("click",changeProduct);
    $color[i].addEventListener("click",changeProduct);
}

function calcPrice(){
    $total.value = parseFloat($price.value)*parseInt($qte.value);
    $viewTotal.innerHTML=roundDecimal($total.value,2)+"€";
}

function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}

function removeAllClasse(elm, nameClass){
    for(var i=0; i<elm.length; i++){
        elm[i].classList.remove(nameClass);
    }
}

function changeProduct(){
    valColor = document.querySelector("#color input:checked").value;
    valProd = document.querySelector("#prod input:checked").value;
    nameClass = "."+valProd+"-"+valColor;
    removeAllClasse($img, "active");
    $ContainImg.querySelector(nameClass).classList.add("active");
    var recupElm =  document.querySelector("#prod input:checked").getAttribute('rel');
    $price.value = products[recupElm].prix;
    $viewPrice.innerHTML=$price.value+"€";
    $nameProduct.innerHTML=products[recupElm].nom;
    $detailProduct.innerHTML=products[recupElm].descriptif;
    theItem = products[recupElm];
    calcPrice();

}

function removeAllClasse(elm, c){
    for(var i=0; i<elm.length;i++){
        if(hasClass(elm[i], c)){
            elm[i].classList.remove(c);
        }
    }
}

function hasClass(elem, c) {
    return elem.classList.contains(c);
}


// ************************************************
// Shop
// ************************************************


var shoppingCart = (function() {
    cart = [];
    
    // Constructor
    function Item(name, price, detail, composite, count) {
      this.name = name;
      this.price = price;
      this.count = count;
      this.detail = detail;
      this.composite = composite;
      this.count = count;
    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    

    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, detail, composite, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, detail, composite, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  



  // Add item

  $add.addEventListener('click',function(){
    event.preventDefault();
    var name = theItem.nom;
    var desc = theItem.descriptif;
    var classe = theItem.classe;
    var composition = theItem.composition;
    var price = parseFloat(theItem.prix);
    shoppingCart.addItemToCart(name, desc, classe, composition, price);
    displayCart();
  });
  
  // Clear items
  /*
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  */
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>";
       output+='<td class="feature">';
            output+=+'<div>';;
            output+='<span class="title">'+cartArray[i].name +'</span>';
            output+='<span class="composite">'+ cartArray[i].composite +'</span>';
            output+='<span class="size">Taille : XL</span>';
            output+='<span class="color">couleur : BORDEAUX</span>';
            output+='<span class="qte">Qté : 1</span>';
            output+='</div>';
        output+='</td>';
        output+='<td class="price">';
        output+=' <a href="#">x</a>';
        output+='<span class="mount">Prix : '+ cartArray[i].price +'€</span>';
        output+='</td>';
        +  "</tr>";
    }
    document.querySelector('.content-product').innerHTML = output;
    //document.querySelector('.mount').innerHTML = shoppingCart.totalCart();
    //$('.total-count').html(shoppingCart.totalCount());
  }
  

  // Delete item button
  /*
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  */
 
 displayCart();