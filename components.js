document.querySelector("#Header").innerHTML = 
`<div class='header'>
    <p class='logo'>Sportify</p>
    <div class='links'>
        <a href="index.html"><button class="home">HOME</button></a>
        <a href="marketplace.html"><button class="marketplaceb">MARKETPLACE</button></a>
        <a href="cart.html"><button onclick="showcart()" class="cart">CART</button></a>
    </div>
</div>`;

document.querySelector("#footer").innerHTML = 
`<div class='footer'>
    <p class='contactus'>Contact Us</p>
    <p> phone: 123-456-7890 </p>
    <p> email: example@gmail.com </p>
</div>`;