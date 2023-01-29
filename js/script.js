// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkJ4kYFKiDmHpr_tPNarMKztxiCki-aoE",
    authDomain: "amorechocodelites-17362.firebaseapp.com",
    projectId: "amorechocodelites-17362",
    storageBucket: "amorechocodelites-17362.appspot.com",
    messagingSenderId: "994194090544",
    appId: "1:994194090544:web:ba80934e91e16ab6f85bf5"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// javascript for dynamic contact page
// first
var contactPage=document.querySelector(".contact-me");
var contactBtn=document.querySelector(".contact-click");
var homeBtn=document.querySelector(".home-btn");

function callPage(params) {
    contactPage.style.cssText="transition: .8s; transform: rotate(0deg) translateX(0vh) translateY(0vh); display: block;";
}
contactBtn.addEventListener("click", callPage);

function returnPage(params) {
    contactPage.style.cssText="transition: .8s; transform: rotate(-45deg) translateX(40vh) translateY(160vh); display: none;";
}
homeBtn.addEventListener("click", returnPage);

// second
var contactPage=document.querySelector(".contact-me");
var contactBtn=document.querySelector(".contact-click2");
var homeBtn=document.querySelector(".home-btn");

function callPage(params) {
    contactPage.style.cssText="transition: .8s; transform: rotate(0deg) translateX(0vh) translateY(0vh); display: block;";
}
contactBtn.addEventListener("click", callPage);

function returnPage(params) {
    contactPage.style.cssText="transition: .8s; transform: rotate(-45deg) translateX(40vh) translateY(160vh); display: none;";
}
homeBtn.addEventListener("click", returnPage);

// javascript for dynamic order pop-up page
var orderPage=document.querySelector(".checkout");
var popUpBtn=document.querySelector("#order-pop-up");
var popUpExit=document.querySelector("#order-exit");

popUpBtn.addEventListener("click", ()=>{
    orderPage.style.cssText="transition: .5s; opacity: 1; transform: translateX(0vh);";
    orderPage.style.opacity="1";
})
popUpExit.addEventListener("click", ()=>{
    orderPage.style.cssText="transition: .5s; opacity: 0; transform: translateX(-200vh);";
    orderPage.style.opacity="0";
})

// javascript for dynamic comments/suggestions
// var opinion=document.querySelector(".comments-suggestions")
// var opinionBtn=document.querySelector("#comments-pop-up");
// var opinionExit=document.querySelector("#comments-exit");

// opinionBtn.addEventListener("click", ()=>{
//     opinion.style.cssText="transition: .5s; opacity: 1; transform: translateX(0vh);";
//     opinion.style.opacity="1";
// })
// opinionExit.addEventListener("click", ()=>{
//     opinion.style.cssText="transition: .5s; opacity: 0; transform: translateX(200vh);";
//     opinion.style.opacity="0";
// })

// javascript for increment and decrement
var increase=document.getElementsByClassName('increment');
var decrease=document.getElementsByClassName('decrement');

function inc2(increase, heading) {
    for(var i=0; i<increase.length;i++){
        var button=increase[i];
        if(button.className.includes(heading))
        button.addEventListener("click", (event)=>{
            var buttonClicked=event.target;
            var input=buttonClicked.parentElement.children[1];
            var value=parseInt(input.value)+1;
            if(value<=20){
                input.value=value;
            }
            else{
                input.value=20;
                alert("Max quantity reached.")
            }
            updateCartTotal();
            updateItemTotal();
        })
    }
}

function dec2(decrease, heading) {
    for(var i=0; i<decrease.length;i++){
        const button=decrease[i];
        if(button.className.includes(heading))
        button.addEventListener("click", (event)=>{
            const buttonClicked=event.target;
            const input=buttonClicked.parentElement.children[1];
            const value=parseInt(input.value)-1;
            if(value>=1||isNaN(value)){
                input.value=value;
            }
            else{
                input.value=1;
            }
            updateCartTotal();
            updateItemTotal();
        })
    }
}

// javascript for remove button
var removeBtn=document.getElementsByClassName('remove-item');
for(var i=0;i<removeBtn.length;i++){
    const button=removeBtn[i];
    button.addEventListener("click", removeCartItem)
}

function removeCartItem(event) {
    const buttonClicked=event.target;
    buttonClicked.parentElement.remove();
        updateCartTotal();
}

// javascript for order compilation
function updateItemTotal(params) {
    var allItemTotal=document.getElementsByClassName('total-price');
    var total=0;
    for(var i=0;i<allItemTotal.length;i++){
        var itemTotal=allItemTotal[i];
        var priceItem=document.getElementsByClassName('item-price')[i];
        var quantityItem=document.getElementsByClassName('number')[i];
        var price=parseInt(priceItem.innerText);
        var quantity=quantityItem.value;
        total=price*quantity;
        itemTotal.innerText=total
    }
}

function updateCartTotal(params) {
    var cartRows=document.getElementsByClassName('order-check')[0];
    var itemRows=cartRows=document.getElementsByClassName('checkout-items');
    var total=0;
    for(var i=0;i<itemRows.length;i++){
        var itemRow=itemRows[i];
        var priceItem=itemRow.getElementsByClassName('item-price')[0];
        var quantityItem=itemRow.getElementsByClassName('number')[0];
        var price=parseInt(priceItem.innerText);
        var quantity=quantityItem.value;
        total=total+(price*quantity);
    }
    document.getElementById('grand-total').innerText=total;
}

// javascript for adding items to cart
var addItemsBtn=document.getElementsByClassName('result');
for(var i=0;i<addItemsBtn.length;i++){
    var addItem=addItemsBtn[i];
    addItem.addEventListener("click", addItemToCart);
}

function addItemToCart(event) {
    var button=event.target;
    var orderItem=button.parentElement.parentElement;
    var heading=orderItem.children[0].children[1].children[0].innerText;
    var price=orderItem.children[1].children[1].innerText.replace('INR/-', '');
    addRowToCart(heading, price)
    updateCartTotal()
}

function addRowToCart(heading, price){
    var newItemRow=document.createElement('div');
    newItemRow.setAttribute("method", "POST");
    newItemRow.setAttribute("action", "javascript:sendMail");
    newItemRow.classList.add('checkout-items');
    var orderItems=document.getElementsByClassName('order-check')[0];
    // validation for only one item of a particular type
    var cartnames=orderItems.getElementsByClassName('item-name');
    for(var i=0;i<cartnames.length;i++){
        if(cartnames[i].innerText==heading){
            alert("This item is already added to the cart.")
            return;
        }
    }
    var newItemRowContents=`
        <input type="submit" value="Remove" class="remove-item">
        <p class="item-name">${heading}</p>
        <p class=item-price>${price}</p>
        <div class="quantity">
            <input type="submit" value="+" class="btn increment ${heading.replace(' ', '')+'inc'}" style="border-bottom-left-radius: 5px; border-top-left-radius: 5px; margin-right: -.7vh;">
            <input type="text" value="1" class="number" style="text-align: center;">
            <input type="submit" value="-" class="btn decrement ${heading.replace(' ', '')+'dec'}" style="border-bottom-right-radius: 5px; border-top-right-radius: 5px; margin-left: -.7vh;">
        </div>
        <p class="total-price">${price}</p>`
    newItemRow.innerHTML=newItemRowContents;
    orderItems.append(newItemRow);
    newItemRow.getElementsByClassName('remove-item')[0].addEventListener("click", removeCartItem);
    newItemRow.getElementsByClassName('increment')[0].addEventListener("click", inc2(increase, heading.replace(' ', '')+'inc'));
    newItemRow.getElementsByClassName('decrement')[0].addEventListener("click", dec2(decrease, heading.replace(' ', '')+'dec'));
}

// javascript for sending mail using purchase button
document.getElementsByClassName('purchase-btn')[0].addEventListener("click", purchased);

function purchased() {

    var itemNames=document.getElementsByClassName('item-name');
    var itemPrices=document.getElementsByClassName('item-price');
    var itemQuantities=document.getElementsByClassName('number'); 
    var arrayNames=[itemNames]
    var arrayPrices=[itemPrices]
    var arrayQuantities=[itemQuantities]
    for(var i=0;i<itemNames.length;i++){
        var itemName=itemNames[i].innerText;
        arrayNames[i]=itemName+"<br>";
    }
    for(var i=0;i<itemPrices.length;i++){
        var itemPrice=itemPrices[i].innerText
        arrayPrices[i]=itemPrice+" INR/-"+"<br>";
    }
    for(var i=0;i<itemQuantities.length;i++){
        var itemQuantity=itemQuantities[i].value
        arrayQuantities[i]=itemQuantity+"<br>";
    }
    let totalPrice=document.getElementById('grand-total').innerText;
    var userName=document.getElementById('name').value;
    var userEmail=document.getElementById('email').value;

    // name and email validation
    if(userName==''||userEmail==''){
        alert("Name and Email ID are compulsory fields.")
        return;
    }

    // order validation
    if(totalPrice==0){
        alert("Sorry! No order found.")
        return;
    }

    // order confirmation
    if(confirm("Do you want to continue with this order?")!=true){
        return;
    }

    alert("Please wait for a moment! You shall receive a confirmation on your order.")
    
    saveInfo(arrayNames, arrayPrices, arrayQuantities, totalPrice, userName, userEmail)

    sendMail(arrayNames, arrayPrices, arrayQuantities, totalPrice, userName, userEmail)
    
    // removing items on purchase
    var cartItems=document.getElementsByClassName('order-check')[0];
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal()

}

// javascript for sending comments to the website
// document.getElementsByClassName('comment-btn')[0].addEventListener("click", comments)

// function comments(){
//     var commentName=document.getElementById('comment-name').value;
//     var commentMessage=document.getElementById('message').value;

//     // validation for comment
//     if(commentName==''||commentMessage==''){
//         alert("Name and Message are compulsory fields.")
//         return;
//     }

//     // order confirmation
//     if(confirm("Do you want to continue with this comment?")!=true){
//         return;
//     }

//     alert("Thank you! Your comment shall be displayed below in the comments section.")

//     saveComments(commentName, commentMessage)
// }

// javascript for sending suggestions
// document.getElementsByClassName('suggest-btn')[0].addEventListener("click", suggestions)

// function suggestions(){
//     var suggestName=document.getElementById('comment-name').value
//     var suggestMail=document.getElementById('comment-mail').value
//     var suggestMessage=document.getElementById('message').value

//     // validation for suggestion
//     if(suggestName==''||suggestMail==''||suggestMessage==''){
//         alert("All fields are compulsory.")
//         return;
//     }

//     // order confirmation
//     if(confirm("Do you want to continue with this suggestion?")!=true){
//         return;
//     }

//     alert("Please wait for a moment! You shall receive a confirmation on your suggestion.")

//     saveSuggestions(suggestName, suggestMail, suggestMessage)

//     sendSuggestions(suggestName, suggestMail, suggestMessage)
// }

// reference databases
let infos=firebase.database().ref("orders");
let userComments=firebase.database().ref("comments");
let userSuggestions=firebase.database().ref("suggestions");

// sending comments to database
// function saveComments(commentName, commentMessage){
//     let newUserComments=userComments.push()

//     newUserComments.set({
//         Username: commentName,
//         Usermessage: commentMessage
//     })
// }
// sending suggestions to database
// function saveSuggestions(suggestName, suggestMail, suggestMessage){
//     let newUserSuggestions=userSuggestions.push()

//     newUserSuggestions.set({
//         Username: suggestName,
//         Usermail: suggestMail,
//         Usermessage: suggestMessage
//     })
// }

// sending order data to database
function saveInfo(arrayNames, arrayPrices, arrayQuantities, totalPrice, userName, userEmail){
    let newInfos=infos.push();

    newInfos.set({
       chocoName: arrayNames,
       chocoPrice: arrayPrices,
       chocoQuantity: arrayQuantities,
       chocototal: totalPrice, 
       customer: userName,
       cusMail: userEmail
    })
}

// retrieving comments from database
// function retrieveComments(){
//     var retrieve=firebase.database().ref("comments")
//     retrieve.on("value", getComments)
// }

// function getComments(data){
//     var review=data.val();
//     var keys=Object.keys(review)
//     for(var i=0;i<keys.length;i++){
//         var datas=keys[i]
//         var Names=review[datas].Username
//         var Messages=review[datas].Usermessage

//         var orderDetails=document.querySelector('.comments')

//         orderDetails.innerHTML+=`
//             <div class="comments-store">
//                 <p><strong>Name:- </strong>${Names}</p>
//                 <p><strong>Comment:- </strong>${Messages}</p>
//             </div>`;
//     }
//     clearUserName=document.getElementById('comment-name')
//     clearUserMail=document.getElementById('comment-mail')
//     clearUserMessage=document.getElementById('message')
//     clearUserName.value="";
//     clearUserMail.value="";
//     clearUserMessage.value="";
// }
// retrieveComments();

// sending suggestions to the maker
// function sendSuggestions(suggestName, suggestMail, suggestMessage){
//     Email.send({
//         Host : "smtp.gmail.com",
//         Username : "amorechoco72@gmail.com",
//         Password : "kahwnmzclecrcykn",
//         To : 'amorechoco72@gmail.com',
//         From : 'amorechoco72@gmail.com',
//         Subject : `You have received a suggestion from ${suggestName}`,
//         Body : `
//         <table style="border: 1px solid #dddd; border-collapse: collapse; margin: 3px; width: 50%; text-align: center;">
//             <tr style="background-color: #dddd;">
//                 <th>Name</th>
//                 <th>Suggestion</th>
//             </tr>
//             <tr>
//                 <td>${suggestName}</td>
//                 <td>${suggestMessage}</td>
//             </tr>
//         </table><br/>Contact the customer by mail at ${suggestMail}`
//     }).then((suggestMail) => alert("Thank you! Your suggestion has been sent to the maker."));
//     clearSuggestName=document.getElementById('comment-name')
//     clearSuggestMail=document.getElementById('comment-mail')
//     clearSuggestMessage=document.getElementById('message')
//     clearSuggestName.value="";
//     clearSuggestMail.value="";
//     clearSuggestMessage.value="";
// }

// sending order mail to the maker
function sendMail(arrayNames, arrayPrices, arrayQuantities, totalPrice, userName, userEmail){
    // to the maker
    Email.send({
        Host : "smtp.gmail.com",
        Username : "amorechoco72@gmail.com",
        Password : "kahwnmzclecrcykn",
        To : 'amorechoco72@gmail.com',
        From : `${userEmail}`,
        Subject : `You have received an order from ${userName}`,
        Body : `
        <table style="border: 1px solid #dddd; border-collapse: collapse; margin: 3px; width: 100%; text-align: center;">
            <tr style="background-color: #dddd;">
                <th>Item</th>
                <th>Price/Per</th>
                <th>Quantity</th>
                <th>Grand Total</th>
            </tr>
            <tr>
                <td>${arrayNames}</td>
                <td>${arrayPrices}</td>
                <td>${arrayQuantities}</td>
                <td>${totalPrice}</td>
            </tr>
        </table><br/>Contact the customer by mail at ${userEmail}`
    }).then((userEmail) => alert("Thank you! Your order has been sent to the maker."));
    clearName=document.getElementById('name')
    clearMail=document.getElementById('email')
    clearName.value="";
    clearMail.value="";

    // to the orderer
    Email.send({
        Host : "smtp.gmail.com",
        Username : "amorechoco72@gmail.com",
        Password : "kahwnmzclecrcykn",
        To : `${userEmail}`,
        From : "amorechoco72@gmail.com",
        Subject : `You have ordered the following:-`,
        Body : `
        <table style="border: 1px solid #dddd; border-collapse: collapse; margin: 3px; width: 100%; text-align: center;">
            <tr style="background-color: #dddd;">
                <th>Item</th>
                <th>Price/Per</th>
                <th>Quantity</th>
                <th>Grand Total</th>
            </tr>
            <tr>
                <td>${arrayNames}</td>
                <td>${arrayPrices}</td>
                <td>${arrayQuantities}</td>
                <td>${totalPrice}</td>
            </tr>
        </table><br/>Contact the craftier by mail at amorechoco72@gmail.com`
    }).then((userEmail) => alert("You must have received your order on your respective mail."));
    clearName=document.getElementById('name')
    clearMail=document.getElementById('email')
    clearName.value="";
    clearMail.value="";
}


// javascript for responsiveness of the website
// javascript for non-windows menu
var menu=document.querySelector(".fa-arrow-circle-right");
var menuPage=document.querySelector(".responsive-menu");
menu.addEventListener("click", ()=>{
    if(menuPage.style.width=="75%"){
        menu.style.transform="rotate(0deg)"
        menuPage.style.width="0%";
    }
    else{
        menu.style.transform="rotate(540deg)"
        menuPage.style.width="75%";
        menuPage.addEventListener("click", ()=>{
            menu.style.transform="rotate(0deg)"
            menuPage.style.width="0%";
        })
    }    
})
