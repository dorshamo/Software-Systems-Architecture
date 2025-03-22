
/*Function updates local storage*/
function processInfo(id,first_name,last_name,phone_number,email,cpu_choice,gpu_choice,mb_choice,ram_size,storage_size,selected_accessories,case_choise,msg,total_price){
    var order_ID = localStorage.length;
    var dbString = stringify(id,first_name,last_name,phone_number,email,cpu_choice,gpu_choice,mb_choice,ram_size,storage_size,selected_accessories,case_choise,msg,total_price);
    localStorage.setItem(order_ID,dbString);
}
/*Function converts variables to strings*/
function stringify(id,first_name,last_name,phone_number,email,cpu_choice,gpu_choice,mb_choice,ram_size,storage_size,case_choise,selected_accessories,msg,total_price){
	var id = 'ID: ' + id
    var first_name_str = 'FisrtName: ' + first_name;
	var last_name_str = 'LastName: ' + last_name;
	var phone_number_str = 'Phone number: ' + phone_number;
	var email_str = 'Email: ' + email;
	var CPU_choice_str = 'CPUChoice: ' + cpu_choice;
    var GPU_choice_str = 'GPUChoice: ' + gpu_choice;
    var MB_choice_str = 'MBChoice: ' + mb_choice;
    var ram_size_str = 'RamSize: ' + ram_size;
    var storage_size_str= 'StorageSize: ' + storage_size;
    var selected_accessories_str = 'SelectedAccessories: ' + (selected_accessories.length > 0 ? selected_accessories.join(', ') : 'None');
    var case_choice_str  = 'CaseChoice: ' + case_choise;
    var msg_str = 'Msg: ' + msg;
    var total_price_str = 'TotalPrice: ' + total_price;
	var db_str = id + ';' + first_name_str + ';' + last_name_str + ';' + phone_number_str + ';' + email_str + ';' + CPU_choice_str + ';' + GPU_choice_str + ';' + MB_choice_str + ';' + ram_size_str + ';' + storage_size_str + ';' + case_choice_str  + ';' + selected_accessories_str + ';' + msg_str + ';' + total_price_str;
	return db_str;	
}
/*function returns the local storage arranged for use*/
function getBuildDb(){
    var keys = [];
    var builds = [];
    keys = Object.keys(localStorage).sort();  /*getting all the keys from the database and sorting them*/
    
    for (let i = 0; i < localStorage.length; i++) {    /*loop over all the orders*/
        var order_ID = keys[i];         /* getting the first key in the sorted array  */
        
        var order_i = localStorage.getItem(order_ID);   /*getting the first item in the databse ny the samllest key */

        var order = new Object();            /* crating a new objcet called order*/
        order.order_ID = order_ID;
        var split_data = order_i.split(";");  /* split the long string into parts seperated by ";"  (that splitData array will look like -- splitData[0] = "name: test"  ;   splitData[1] = "ID: 012345678"  ; etc..)*/
        split_data.forEach(element => {         /* for each of the splitData array elements, meaning the "name: test" etc..*/
            var parts = element.split(":");  /* split each string again at the ":" mark so each parts array will look like --  parts = ["name"," test"]*/
            order[parts[0]] = parts[1];        /* creaate a new key - value pair in the order object with the two strings we split before. it will look like order{name: "test", ID: "012345678" .  etc...}*/
        });
        builds.push(order); /* push order object int the builds array */
    }
    return builds;
}

/*Delete item in the local storge */ 
function deleteItem(key) {
        localStorage.removeItem(key);
        renderTableHtml();
    }

/*clear all the items from local storge */ 
function clearLocalStorage() {
        localStorage.clear();
        renderTableHtml();
}

/*edit item from local storge */ 
function editItemJS(key,newDBString) {
        localStorage.setItem(key,newDBString);
}

/*function finds the order ID in local storage and returns all the order details*/
function viewOrdersByID(inserted_id) {
    let matching_orders = []; // Array to hold all matching orders

    for (let i = 0; i < localStorage.length; i++) {
        let order_key = localStorage.key(i);
        let order_data = localStorage.getItem(order_key).split(';');

        if (order_data[0].includes(inserted_id)) {
            matching_orders.push(order_data); // Add the matching order to the array
        }
    }
    
    return matching_orders.length > 0 ? matching_orders : null; // Return all matching orders or null if none found
}


/*test if id is in the local storge*/
function isThisIDExist(id) {
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
        var value = localStorage.getItem(keys[i]);
        if (value.includes(id)) {
            return true; 
        }
    }
    return false; 
}
