var db = openDatabase("mydb", "1.0", "Test Db", 2*1024*1024);//create a database named mydb
var msg;
    
function add() {                    //add function only exectues when the add button is clicked
    var id = document.getElementById('ID').value;           //get the values from the input fields
    var name = document.getElementById('name').value;
    var img = document.getElementById('img').value;
    var Price = document.getElementById('Price').value;
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Marketplace2', [], function (tx, results) {        //select all from the table named Marketplace2
            var len = results.rows.length;
            tx.executeSql(`INSERT INTO Marketplace2 (id, name, img, Price) VALUES ("${id}", "${name}", "${img}", ${Price})`);       //insert the values into the table
        }, null);
    });
    show();
}

db.transaction(function (tx) {  //executes on startup and creates a table named Marketplace2
    tx.executeSql('CREATE TABLE IF NOT EXISTS Marketplace2 (id unique, name TEXT, img TEXT, Price )'); 
    tx.executeSql(`INSERT INTO Marketplace2 (id, name, img, Price) VALUES ("1", "2", "3", 4)`);
    tx.executeSql("DELETE FROM Marketplace2 WHERE id = '1'")
            
})

function del(){   //delete function only exectues when the delete button is clicked
    var id = document.getElementById('deleteItem').value;
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Marketplace2', [], function (tx, results) { 
            var len = results.rows.length;
            tx.executeSql(`DELETE FROM Marketplace2 WHERE id = "${id}"`);//delete the row with the id that matches the input
        }, null);
    });
    show();
}

function show() {
    document.querySelector('#status').innerHTML = "";
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Marketplace2', [], function (tx, results) { //html to add more items to the marketplace
            var len = results.rows.length, i;
            for (i = 0; i < len; i++){
                msg = `
                <div class="item">
                    <img class="itemimg" style="margin:5px;" src="${results.rows.item(i).img}" alt="item">
                    <p class="name" style="margin:0;">${results.rows.item(i).name}</p>
                    <p class="name" style="margin:5px;">ID: ${results.rows.item(i).id}</p>
                    <p class="price" style="margin:0;">Price: ${results.rows.item(i).Price}</p>
                    <button onclick="cart('${results.rows.item(i).id}')" class="addtocart" style="margin:10px;">Add to Cart</button>
                </div>`; 
                document.querySelector('#status').innerHTML +=  msg;
            }
        }, null);
    });
}

show();
