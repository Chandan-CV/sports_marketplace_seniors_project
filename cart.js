var db = openDatabase("mydb", "1.0", "Test Db", 2*1024*1024);
var msg;


db.transaction(function (tx) { //executes on startup and creates a table named Cart
    tx.executeSql('CREATE TABLE IF NOT EXISTS Cart (id unique, name TEXT, img TEXT, Price NUMBER  )'); 
    tx.executeSql(`INSERT INTO Cart VALUES ("2", "ne 2", "3", 4)`);
    tx.executeSql(`DELETE FROM Cart WHERE id : '2'`);
})


function cart(id){//add to cart function using the id of the item   
    alert(`added ${id } to cart`)
    db.transaction(function (tx){
        tx.executeSql('SELECT * FROM Marketplace2', [], function (tx, results) { //searches the table Marketplace2 for the item with the id that matches the input
            var len = results.rows.length, i;
            for (i = 0; i < len; i++){
                if (id == results.rows.item(i).id){
                    tx.executeSql(`INSERT INTO Cart (id,name,img,Price) VALUES ("${id}","${results.rows.item(i).name}","${results.rows.item(i).img}",${results.rows.item(i).Price})`)
                    break
                }
            }
        },null);
    })
}


function showcart(){
    document.querySelector("#cartlist").innerHTML = "";
    var total =0;
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Cart', [], function (tx, results) { 
            var len = results.rows.length, i;
            for (i = 0; i < len; i++){//creates a div for each item in the cart
                msg = `
                <div class="itemlist">
                    <img class="itemimg" style="margin:5px;" src="${results.rows.item(i).img}" alt="item">
                    <div class="props">
                        <p class="name" style="margin:0;">${results.rows.item(i).name}</p>
                        <p class="name" style="margin:5px;">ID: ${results.rows.item(i).id}</p>
                        <p class="price" style="margin:0;">Price: ${results.rows.item(i).Price}</p>
                    </div>
                </div>`; 
                total += results.rows.item(i).Price
                document.querySelector("#cartlist").innerHTML +=  msg;
            }
            document.querySelector("#total").innerHTML =  `<p>TOTAL: </p><p>${total}</p>`;
        }, null);
    });
}


function reset() {
    db.transaction(function (tx) {
        tx.executeSql("DELETE FROM Cart",[],function (t) {
        },null);
    })
    showcart()
}

showcart()

function checkout(){
    alert("checked out")
}