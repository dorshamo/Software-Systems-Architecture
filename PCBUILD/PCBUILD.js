
function nextPage() {/* (Am I a robot) Function Clicking a button on the login page */
    var rob = document.getElementById('robot'); 
    var alert_msg = "";
    if (!rob.checked) {
        alert_msg = "I hate robots!";
    }
    if (alert_msg) {
        alert(alert_msg);
    }
    else{
        window.location.href = "PCBUILD_PARTPICKER.html";
    }
}
function isValidName(text) {/*First name and last name check function*/
    var text_regex = /^[^0-9<>!@#$%^&*()]*$/;
    return text_regex.test(text);
}
function isValidPhone(phone) {/*Phone number check function*/
    var phone_regex = /^[0-9]{9,10}$/;
    return phone_regex.test(phone);
}
function isValidEmail(email) {/*Email check function*/
    var email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_regex.test(email);
}
function isValidID(id) {/*ID number check function*/
    var id_regex = /^\d{9}$/;
    return id_regex.test(id);
}
function generateText() {/* Function checks the form filling and also writes the text below and calculates the total price */
    
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var phone_number = document.getElementById('phone_number').value;
    var email = document.getElementById('email').value;
    var id = document.getElementById('id').value;
    var cpu_choice = document.getElementsByName('cpu');
    var cpu = '';
    var total_price = 0;
    for (i = 0; i < cpu_choice.length; i++) {
        if (cpu_choice[i].checked) {
            cpu = cpu_choice[i].value;
            total_price = total_price + Number(cpu_choice[i].getAttribute('data-price'));
            break;
        }
    }
    var gpu_choice = document.getElementsByName('gpu');
    var gpu = '';
    for (i = 0; i < gpu_choice.length; i++) {
        if (gpu_choice[i].checked) {
            gpu = gpu_choice[i].value;
            total_price = total_price + Number(gpu_choice[i].getAttribute('data-price'));
            break;
        }
    }
    var mb_choice = document.getElementsByName('motherboard');
    var mb = '';
    for (i = 0; i < mb_choice.length; i++) {
        if (mb_choice[i].checked) {
            mb = mb_choice[i].value;
            total_price = total_price + Number(mb_choice[i].getAttribute('data-price'));
            break;
        }
    }

    var ram_dropdown = document.getElementById('ram_list');
    var ram_size = ram_dropdown.value;
    var selected_option1 = ram_dropdown.options[ram_dropdown.selectedIndex];
    total_price = total_price + Number(selected_option1.getAttribute('data-price'));

    var storage_dropdown = document.getElementById('storage_size_list');
    var storage_size = storage_dropdown.value;
    var selected_option2 = storage_dropdown.options[storage_dropdown.selectedIndex];
    total_price = total_price + Number(selected_option2.getAttribute('data-price'));

    var accessories = document.getElementsByName('accessories_list');
    var selected_accessories = [];
    for (i = 0; i < accessories.length; i++) {
        if (accessories[i].checked) {
            selected_accessories.push(accessories[i].value);
            total_price = total_price + Number(accessories[i].getAttribute('data-price'));
        }
    }
    var cases = document.getElementsByName('case');
    var case_choise = '';
    for (i = 0; i < cases.length; i++) {
        if (cases[i].checked) {
            case_choise = cases[i].value;
            break;
        }
    }
    var msg = 'None';
    msg = document.getElementById('notes').value;

    var alert_msg = "";
    if (first_name == '') {
        alert_msg += "Please enter your name.";
    }else if (!isValidName(first_name)) {
        alert_msg += "\nInvalid first name.(No number and special characters)";
    }    
    if (last_name == '') {
        alert_msg += "\nPlease enter your last name.";
    }else if (!isValidName(last_name)) {
        alert_msg += "\nInvalid last name.(No number and special characters)";
    } 
    if (phone_number == '') {
        alert_msg += "\nPlease enter your phone number.";
    } else if (!isValidPhone(phone_number)) {
        alert_msg += "\nInvalid phone number. Please enter a 10-digit number.";
    }
    if (email == '') {
        alert_msg += "\nPlease enter your email.";
    } else if (!isValidEmail(email)) {
        alert_msg += "\nInvalid email address.";
    }
    if (id == '') {
        alert_msg += "\nPlease enter your ID.";
    } else if (!isValidID(id)) {
        alert_msg += "\nInvalid ID";
    }
    if (cpu == '') {
        alert_msg += "\nPlease select a CPU.";
    }
    if (gpu == '') {
        alert_msg += "\nPlease select a GPU.";
    }
    if (mb == '') {
        alert_msg += "\nPlease select a Motherboard size.";
    }
    if (case_choise == '') {
        alert_msg += "\nPlease select a case color.";
    }
    if (alert_msg == '') {
        if (msg == '') {
            msg = 'None';
        }
        processInfo(id,first_name,last_name,phone_number,email,cpu,gpu,mb,ram_size,storage_size,case_choise,selected_accessories,msg,total_price);
        
        var text_for_display = "Hello " + first_name + ' ' + last_name + "!</br>";
        text_for_display += "ID: "+ id +"</br>"; 
        text_for_display += "Your message is: </br>" + msg + "</br>";
        text_for_display += "Your PC choice is: </br>" + "CPU: " + cpu + "</br>GPU: " + gpu + "</br>Motherboard Size: " + mb;
        text_for_display += "</br>RAM size: " + ram_size + "</br>Storage size: " + storage_size + "</br>";
        text_for_display += "Accessories: ";
        for (i = 0; i < selected_accessories.length; i++) {
            text_for_display += selected_accessories[i] + ", ";
        }
        text_for_display += "</br>The case color you chose is: " + case_choise;
        text_for_display += "</br>THE TOTAL PRICE IS : " + total_price + "$";
        clearForm();
        document.getElementById('res').innerHTML = text_for_display;
    } else {
        document.getElementById('res').innerHTML = '';
        alert(alert_msg);
    }
}

function clearForm() {/*function clear the form*/
    document.querySelectorAll("input, textarea").forEach(element => {
        if (element.type === "radio" || element.type === "checkbox") {
            element.checked = false; 
        } else {
            element.value = ""; 
        }
    });
    const resultElement = document.getElementById("res"); /* clear (res) */
    if (resultElement) {
        resultElement.innerHTML = ""; 
    }
}

function colorChanger() {/*Title color change function*/
    var title = document.getElementById('title');
    var red = 0;
    var green = 0;
    var blue = 0;
    if (title){
        setInterval(function () {
            red = (red + 1) % 256;
            green = (green + 2) % 256;
            blue = (blue + 3) % 256;
    
            title.style.color = "rgb(" + red + ", " + green + ", " + blue + ")";
        }, 25);
    }
}
document.addEventListener("DOMContentLoaded", colorChanger);


const currentURL = window.location.href;
/* Check if we are in the order managment html to refresh the table*/
if (currentURL.includes("PCBUILD_ORDERMANAGEMENT")) {
    document.addEventListener("DOMContentLoaded",renderTableHtml);
}

document.addEventListener("DOMContentLoaded", () => {/*Disable the backward button to disable from going back to order mengment */
    /* Push the current state to history*/
    history.pushState(null, "", window.location.href);

    /* Listen for back button presses*/
    window.onpopstate = function () {
        /* Prevent the user from navigating back*/
        history.pushState(null, "", window.location.href);
    };
});

/*The login admin display box */
if (currentURL.includes("PCBUILD_PARTPICKER")) {
document.addEventListener("DOMContentLoaded", function () {
    var login_button = document.getElementById("login-btn");
    var loginModal = document.getElementById("login-modal");
    var close_button = document.getElementById("close-btn");

    /* Open modal on button click*/
    login_button.addEventListener("click", () => {
        loginModal.style.display = "block";
    });

    /* Close modal on close button click*/
    close_button.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

});}
function adminLogin() {/*Admin login test */
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username === "admin" && password === "12345") {
        alert("Login successful!");
        var loginModal = document.getElementById("login-modal");
        if (loginModal) {
            loginModal.style.display = "none";
        }

        window.location.href = "PCBUILD_ORDERMANAGEMENT.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}
function clearLocalStorageHtml() {/*clear all the items from local storge */ 
    if (confirm("Are you sure you want to clear all data?")) {
    clearLocalStorage();/*call the function from the pcbuild_save.js */ 
    }
}
function deleteItemHtml(key) {/*Delete item in the local storge */ 
    if (confirm(`Are you sure you want to delete "${key}"?`)) {
        deleteItem(key);/*call the function from the pcbuild_save.js */ 
    }
}
function renderTableHtml() {/* refresh the local storge table*/ 
    var orders = getBuildDb();
    var tableBody = document.querySelector("#data-table tbody");
    tableBody.innerHTML = ""; 
    orders.forEach((key ,index) => {  /* for each order, we create a new row*/
		var row = document.createElement("tr");
        var order_ID = key.order_ID;    /*getting the order_ID for the delete button, to know which row to delete*/
        Object.values(key).forEach(element => {   /*for each of the values of the order object (the name, ID etc..), we create a new cell in the row*/
            row.innerHTML += `<td>${element}</td>`
        });
        row.innerHTML +=   /* adding the edit and remove buttons for each row*/
        ` 
            <td>
                <button onclick="editItem('${index}', event)">Edit</button>
                <button onclick="deleteItemHtml('${order_ID}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row); /*adding the string to the HTML as a child of the table*/
    });
}


var editMode = false;
var currentEditButton = null;
function editItem(key,event) {/*This function gets a key as an iput, which tells the funcrion which row to work on,
                        and ith then either sets the cells to edit mode, or saves the values of the cells and exits edit mode */ 
    var priceAfterEdit = 0;
    var editButtons = document.querySelectorAll("button"); 
    if (!editMode){
        currentEditButton = event.target; 
        editButtons.forEach(button => {/*disable all button in the page in edit mode*/
            if (button !== currentEditButton) {
                button.disabled = true; 
            }
        });                 /*if we are not already in edit mode, enter edit mide  */ 
        changeCell(key, 1); /*we set each of these cells (1-5) to a text input so we can etid them */ 
        changeCell(key, 2);
        changeCell(key, 3);
        changeCell(key, 4);
        changeCell(key, 5);
        openCellDropDown(key);   /*we set all the cells that need to have adrop down to have a dropdown selection */ 
        openBoxSelection(key,12);   /*we set the single cell that needs to have a chedckbox selection, to that. */ 
        editMode = true;
    }
    else{                  /*we are already in edit mode, so we need to  save the edit*/
        saveCell(key, 1);  /*we save each of the text cells */
        saveCell(key, 2);
        saveCell(key, 3);
        saveCell(key, 4);
        saveCell(key, 5);
        priceAfterEdit += saveCellDropDown(key);  /*caclulation of the dropdown items price */
        priceAfterEdit += saveBoxSelection(key,12);     /*calculation of the checkbox items price */
        var table = document.querySelector("#data-table tbody");
        var row = table.rows[key];
        row.cells[14].textContent = priceAfterEdit;               /*14 is the index of the total price column*/
        newDBString = stringify(row.cells[1].textContent,row.cells[2].textContent,row.cells[3].textContent,row.cells[4].textContent,row.cells[5].textContent,row.cells[6].textContent,row.cells[7].textContent,row.cells[8].textContent,row.cells[9].textContent,row.cells[10].textContent,row.cells[11].textContent,row.cells[12].textContent.split(","),row.cells[13].textContent,row.cells[14].textContent);
        /*we strinigy all the new text contents of the cell in order to send them to the databse later */
        editItemJS(key,newDBString);  /* call the function from the Database script to enter the string to the databse */
        editButtons.forEach(button => {/*enable all button in the page out of edit mode*/
            button.disabled = false;
        });
        currentEditButton = null;
        editMode = false;
    }
}

function changeCell(key, index){  /* this function gets a key(a row in the table) and an index (a cell in the row)
                                    and setes the cell to a text input with the value of the HTML text that it already had in it */
    var table = document.querySelector("#data-table tbody");
    var row = table.rows[key];
    row.cells[index].innerHTML = `<input style="width: 100%" type="text" value="${row.cells[index].textContent}" />`;
    
}

function saveCell(key, index){/* inputs : key = row in table
                                          index = the index of the cell
                                 this function saves the values of the text inputed to the text iput, removes the text input and sets the cell to contain the plain text 
                                 that was inputed */
    var table = document.querySelector("#data-table tbody");
    var row = table.rows[key];
    var value = row.cells[index].querySelector("input").value;  /* get the value of the input */
    row.cells[index].textContent = value;  /* set the HTML text to ve the value */
}
function openCellDropDown(key){ /* inputs : key = row in table
                                   this function first crates an array that contains all the producs with thier prices
                                   it then goes over all the cells that need to have a drop down menu, and adds a frop down menu.
                                   it populates the options with the values of the name of the item, and the data-price attribute set to the price of the item  */
    var table = document.querySelector("#data-table tbody");
    var row = table.rows[key];
    partsArr=[
        ["Intel;600","Amd;700"],
        ["RTX 4080;1850","RTX 4060ti;1250","7800xt;1650","7900xtx;1800"],
        ["ATX;400","Micro ATX;300","Mini ATX;250"],
        ["8 GB;100","16 GB;150","32 GB;200","64 GB;300"],
        ["512 GB;50","1 TB;70","2 TB;100","3 TB;130"],
        ["Black","Blue","Green","Red"]
    ];
    for(let i = 6;i<=11;i++){
        let dropdownHTML = `<select>`;
        partsArr[i-6].forEach(item => {
            itemAndPrice=item.split(";");       /*we split the string to get the name of the item and the price */
            item = itemAndPrice[0];             /*the item itslef */
            price = itemAndPrice[1]             /*the price */
            dropdownHTML += `<option value="${item}" data-price="${price}" ${row.cells[i].textContent.includes(item) ? "selected" : ""}>${item}</option>`;    /*adds an option and checks to find which option was previously already selected */
        });
        dropdownHTML += `</select>`;
        row.cells[i].innerHTML = dropdownHTML;

    }
}
function saveCellDropDown(key){/*inputs: key = a row in the table
                                 this function goes over all the drop down menus and saves the values that are selected,
                                 sets the cell text to contain that value and retruns the price calulation of the drop down items */
    var table = document.querySelector("#data-table tbody");
    var row = table.rows[key];
    var dropDownItemsPrice = 0;             /*a var to hold the total price of all the drop down menu items that are selected by the admin */
      for(let i = 6;i<=11;i++){
        
        var selectElement = row.cells[i].querySelector("select");                 /* find the selection menu in the cell */
        var value = selectElement.value;                                          /* to get the value we dont need the index, just '.value' */
        var selectedChoice = selectElement.options[selectElement.selectedIndex]   /*find out which option is selected using the index of the selected choice */
        var price = Number(selectedChoice.getAttribute('data-price'));            /*getting the price for the HTML atrribute data-price; */
        if (!isNaN(price)){       /* if price is a number */
            dropDownItemsPrice += price;
        }
        
        row.cells[i].textContent = value;
    }
    return dropDownItemsPrice           /* this function retruns the total price of the drop downs at the end */
}

function openBoxSelection(key,index){ /* inputs: key = a row in the table 
                                                 index = an index of a cell in the row
                                                 this function creates a checkbox selection in the needed cell */
    var table = document.querySelector("#data-table tbody");
    var row = table.rows[key];
    var chosenAccessories = row.cells[index].textContent;   //getting the string of the selecte accessories

    row.cells[index].innerHTML = 
    `<div>
    <input type="checkbox" value="monitor" ${chosenAccessories.includes("monitor") ? "checked" : ""} data-price="300"/> Monitor </br>   
    <input type="checkbox" value="mouse" ${chosenAccessories.includes("mouse") ? "checked" : ""} data-price="40"/> Mouse </br>
    <input type="checkbox" value="headphones" ${chosenAccessories.includes("headphones") ? "checked" : ""} data-price="100"/> Headphones
    </div>`;                                     /* inserting the checkboxes to the cell, and checking if a checbox is supposed to checkd, then checking it if so */

}

function saveBoxSelection(key,index){/* key = a row in the table 
                                        index = an index of a cell in the row 
                                        his function saves the value of the seleced checkboxes, sets the HTML value to the selected options, 
                                        and retruns the price of the selected options */
    var selected_accessories = [];
    var table = document.querySelector("#data-table tbody");
    var row = table.rows[key];
    var select = row.cells[index].querySelectorAll("input");   /* all the checboxes in the cell */
    var checkBoxPrice = 0;
    for (i = 0; i < select.length; i++) {   /*for all the checkboxes*/
        if (select[i].checked) {            /*if a checkbox is selected*/
            
            selected_accessories.push(select[i].value);     /*push the options value int oand array*/
            var price = Number(select[i].getAttribute('data-price'));       /*gets an options price from its HTML attribute and make it a number*/
            checkBoxPrice+=price;       /*add its price to the total selected checkbox price*/
        }
    }
    
    var html = ''
    for (i = 0; i < selected_accessories.length; i++) {         /* a for loop that creates a sring fro the selected options */
        html += selected_accessories[i] + ", ";
    }
    row.cells[index].textContent = html;        /*se the HTML text to the seelcted options*/
    return checkBoxPrice            /*this function retruns the total price of the selected checkboxes */
}

function viewOrderTable() {
    let inserted_id = document.getElementById('personal_order').value.trim();

    if (isValidID(inserted_id)) {
        let matching_orders = viewOrdersByID(inserted_id); /* Fetch all matching orders*/

        if (matching_orders) {
            /* Start building the table*/
            let res = `<table border="1" style="border-collapse: collapse; width: 100%;">`;
            res += `<thead><tr>`;

            /* Generate headers for each order*/
            matching_orders.forEach((_, index) => {
                res += `<th>Order ${index + 1}</th>`;
            });

            res += `</tr></thead><tbody><tr>`;

            /* Generate content for each order*/
            matching_orders.forEach(order => {
                res += `<td>`;
                res += `<strong>Hello ${order[1].split(':')[1].trim()} ${order[2].split(':')[1].trim()}!</strong><br>`;
                res += `CPU: ${order[5].split(':')[1].trim()}<br>`;
                res += `GPU: ${order[6].split(':')[1].trim()}<br>`;
                res += `Motherboard: ${order[7].split(':')[1].trim()}<br>`;
                res += `RAM: ${order[8].split(':')[1].trim()}<br>`;
                res += `Storage: ${order[9].split(':')[1].trim()}<br>`;
                res += `Accessories: ${order[10].split(':')[1].trim()}<br>`;
                res += `Case Color: ${order[11].split(':')[1].trim()}<br>`;
                res += `Total Price: $${order[13].split(':')[1].trim()}<br>`;
                res += `Message: ${order[12].split(':')[1].trim()}<br>`;
                res += `</td>`;
            });

            res += `</tr></tbody></table>`;

            /*Display the table*/
            document.getElementById('res').innerHTML = res;
        } else {
            alert("No orders found for the given ID.");
        }
    } else {
        alert("Invalid ID format.");
    }
}



function EsterEgg()/*EsterEgg function change picture and open youtube video */
{
    document.getElementById("logo").src = "images/newLogo.png";
    window.open('https:/www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley', '_blank');
}
function mouseOverImage() {/*Function chance picture when mouse over the image */
    document.getElementById("case").src = "images/case2.png";
}

function mouseOutImage() {/*Function chance picture when mouse is not over the image */
    document.getElementById("case").src = "images/case1.png";
}
