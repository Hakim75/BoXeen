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
nameClass = ".st-bc";
var products = new Array();
var product1 = {
        "nom":"L'impressioniste",
        "prix":53.99,
        "composition":"Lin/lenpur",
        "descriptif":"L'alliance du lin et du lenpur confère au caleçon une étoffe anallergique aux propriétées thermo-régulatrice, dans un boxer d'une grande qualité. Le lenpur fibre produite sur les pin blanc du nord de la france s'allie à merveille avec le lin. Le produit fini est doux sans perdre en robustesse, élégant. "
    };
var product2 = {
    "nom":"L'innovant",
    "prix":56.00,
    "composition":"Lin/Tencel",
    "descriptif":"Ce boxer est une équivalent du soyeux de par la présence du Tencel. l'utilisation du lin apporte un confort d'utilisation significatif grâce à ses qualités thermo-régulatrice. Le produit fini est très doux, un boxer qui accompagnera son propriétaire en délicatesse dans les entreprises les plus hardues."
};
var product3 = {
    "nom":"le Brave",
    "prix":25.99,
    "composition":"Coton/chanvre",
    "descriptif":"Le tissage des fibres de chanvre et de coton permet d'apporter douceur et résistance. Le coton est issue du recyclage, une seconde vie qui est là pour vous apporter le confort que tous les braves méritent. Le produit fini est doux, robuste, hyper-confortable."
};
var product4 = {
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

