
var path = document.location.href;
var root  = path.substring( 0 ,path.lastIndexOf( "/" ) );
var name     = path.substring(path.lastIndexOf( "/" )+1 );

var recupName = name.split("#");
var page = recupName[0];

