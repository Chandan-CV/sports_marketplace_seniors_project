var msg;


function cart(id){//add to cart function using the id of the item   
    alert(`adding ${id } to cart`)
    fetch(`http://localhost:3000/postcart?id=${id}`).then(()=>{alert("added to cart")})
}


function showcart(){
    document.querySelector("#cartlist").innerHTML = "";
    var total =0;
        fetch("http://localhost:3000/cart").then((response) => {
            return response.json();
        }).then((results) => {
            console.log(results);
            var len = results.length, i;
            for (i = 0; i < len; i++){//creates a div for each item in the cart
                msg = `
                <div class="itemlist">
                    <img class="itemimg" style="margin:5px;" src="${results[i].image}" alt="item">
                    <div class="props">
                        <p class="name" style="margin:0;">${results[i].name}</p>
                        <p class="name" style="margin:5px;">ID: ${results[i].id}</p>
                        <p class="price" style="margin:0;">Price: ${results[i].price}</p>
                    </div>
                </div>`; 
                total += results[i].price
                document.querySelector("#cartlist").innerHTML +=  msg;
            }
            document.querySelector("#total").innerHTML =  `<p>TOTAL: </p><p>${total}</p>`;
        });
}

showcart()

function checkout(){
    alert("checked out")
}