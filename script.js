var msg;

function add() {
  alert("adding item");
  //add function only exectues when the add button is clicked
  var id = document.getElementById("ID").value; //get the values from the input fields
  var name = document.getElementById("name").value;
  var img = document.getElementById("img").value;
  var price = document.getElementById("price").value;
  fetch(
    `http://localhost:3000/addproduct?id=${id}&name=${name}&image=${img}&price=${price}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("added item");
    });
  show();
}

function del() {
  //delete function only exectues when the delete button is clicked
  var id = document.getElementById("deleteItem").value;
  fetch(`http://localhost:3000/deleteproduct?id=${id}`).then(() => {
    alert("deleted item");
  });
  show();
}

function show() {
  console.log("I am at function show");
  document.querySelector("#status").innerHTML = "";
  //html to add more items to the marketplace
  fetch("http://localhost:3000/venues")
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      console.log(results);
      var len = results.length,
        i;
      for (i = 0; i < len; i++) {
        msg = `
                <div class="item">
                    <img class="itemimg" style="margin:5px;" src="${results[i].image}" alt="item">
                    <p class="name" style="margin:0;">${results[i].name}</p>
                    <p class="name" style="margin:5px;">ID: ${results[i].id}</p>
                    <p class="price"price style="margin:0;">Price: ${results[i].price}</p> <p class="price" style="margin:0;">Location: ${results[i].location}</p>
                    <button onclick="cart('${results[i].id}')" class="addtocart" style="margin:10px;">Add to Cart</button>
                </div>`;
        document.querySelector("#status").innerHTML += msg;
      }
    });
}

show();
