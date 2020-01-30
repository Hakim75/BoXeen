





//Function scrolling top from bottom

function scrollLent()
{
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop > 0)
    {
        scrollBy(0, -5);
        setTimeout(scrollLent, 5);
    }
    return true;
}