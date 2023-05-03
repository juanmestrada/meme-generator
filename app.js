document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");
    const prevText = document.querySelector(".prevText");
    const gallery = document.getElementById("gallery");
    const modal = document.getElementById("modal");
    const addBtn = document.getElementById("add");
    const cnclBtn = document.querySelector(".cncl");

    const topText = document.getElementById("prev-top-text");
    const prevImg = document.getElementById("prevImg");
    const bttmText = document.getElementById("prev-bottom-text");

    const form = document.getElementById("form");
    const formLink = document.getElementById("formlink");
    const errorMsg = document.querySelector(".error-msg");

    function toggleModal(){

        if(modal.className !== "show"){
            topText.innerText = "";
            bttmText.innerText = "";
            prevImg.src = "https://i.imgflip.com/18d84i.jpg";

            form.reset();
        }

        modal.classList.toggle("hidden");
        modal.classList.toggle("show");
    }

    container.addEventListener("click", function(e) {
        const clickedItem = e.target;

        if(clickedItem.id === "add"){
            toggleModal();
        } else if(clickedItem.className === "modalbtn cncl"){
            toggleModal();
        } else if(clickedItem.className === "card-delete-btn"){
            clickedItem.parentElement.remove();
        }
    })

    // form submit
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // deny form submission if img url invalid
        if(formLink.className === "modalInput invalid"){
            return;
        }
    
        // create meme card
        const newCard = document.createElement("div");
        newCard.classList.add("card");

        const cardtopText = document.createElement("div");
        cardtopText.classList.add("card-top-text");

        const cardImg = document.createElement("img");

        const cardbtmText = document.createElement("div");
        cardbtmText.classList.add("card-bottom-text");

        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("card-delete-btn");

        // card img
        newCard.append(cardImg)
        cardImg.src = e.target[0].value;

        // card toptext
        newCard.append(cardtopText);
        cardtopText.innerText = e.target[1].value;
        
        // card bottomtext
        newCard.append(cardbtmText);
        cardbtmText.innerText = e.target[2].value;

        // card delete btn
        newCard.append(deleteBtn);
        deleteBtn.innerText = "X"

        // append card
        gallery.append(newCard);
        
        // hide modal
        toggleModal()
    });

    // update preview card text
    form.addEventListener("keyup", function(e) {
        const target = e.target;

        if(target.className === "modalInput prevText"){

            // update meme preview on keypress
            if(target.id === "topText"){
                topText.innerText = target.value;
            } else if(target.id === "bottomText"){
                bttmText.innerText = target.value;
            }
        }
    });

    // update preview card img
    formLink.addEventListener("change", function(e){
        
        prevImg.src = e.target.value; 

    })

    // validate img url 
    prevImg.addEventListener("error", function(e){
        
        if(formLink.className !== "modalInput invalid"){
            formLink.classList.add("invalid");
            errorMsg.innerText = "Not a valid link";
        }

    })

    // image url is valid
    prevImg.addEventListener("load", function(e){
        if(formLink.className === "modalInput invalid"){
            formLink.classList.remove("invalid");
            errorMsg.innerText = "";
        }
    })

});