// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase,
        ref,
        push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
databaseURL: "https://leads-tracker-app-ab5c7-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

// console.log(database)
// console.log(referenceInDB)

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
})

onValue(referenceInDB, function(snapshot){
    const isSnapshotExits = snapshot.exists()

    if (isSnapshotExits){
        const leads = Object.values(snapshot.val())
        console.log(leads)
        render(leads)
    } else{
        console.log("No, data exists!")
        render([])
    }
    
})

inputBtn.addEventListener("click", function saveInput() {
    const inputValue = inputEl.value.trim();
    
    if (inputValue !== "") {
        push(referenceInDB, inputValue);
        inputEl.value = "";
    } else{
        console.log("Enter shopping list item name!")
    }
});

inputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        saveInput();
    }
});

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})