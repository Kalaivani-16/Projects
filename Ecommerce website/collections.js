var productContainer=document.getElementById("product1")
var search=document.getElementById("search")
var productList=productContainer.getElementsByClassName("pro")

search.addEventListener("keyup",function(event){
    var enteredValue= event.target.value.toUpperCase()

    for(count=0; count<productList.length; count=count+1)
    {
        var productName=productList[count].querySelector("h5").textContent

        if(productName.toUpperCase().indexOf(enteredValue) < 0)
        {
            productList[count].style.display="none"
        }
        else{
            productList[count].style.display="block"
        }
    }
})