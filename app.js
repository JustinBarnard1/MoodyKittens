/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let allKittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    name: form.name.value,
    id: generateId(),
    image: `https://robohash.org/${form.name.value}?set=set4`,
    mood: 5,
    temperment: "Tolerant"
  }

  let foundKitten = allKittens.find(nameCheck => nameCheck.name === kitten.name)
  //console.log(foundKitten)

  if (!foundKitten) {
    foundKitten = kitten
    allKittens.push(kitten)
    //console.log("worked")
  } else {
    errorMessage()
    //console.log("Already exists")
  }
  //setKittenMood()
  saveKittens()
  form.reset()
}


function errorMessage() {
  myVar = setTimeout(function () { alert("A Kitten With That Name Already Exists.") }, 200);
}

function removeKitten(name) {
  let index = allKittens.findIndex(skitten => skitten.name == name)
  if (index == -1) {
    throw new Error('Invalid Kitten Name')
  }
  allKittens.splice(index, 1)
  saveKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem('allKittens', JSON.stringify(allKittens))
  drawKittens()

}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem('allKittens'))
  if (storedKittens) {
    allKittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens()
  let allKittenListElement = document.getElementById('allKittens')
  let allKittensTemplate = ""
  allKittens.forEach(singleKitten => {
    allKittensTemplate += `
      <div id="singleDiv" class="text-light fixedContainer bg-dark">
        <img id="${singleKitten.id}" class="kitten ${singleKitten.id}" src=${singleKitten.image} alt=${singleKitten.name}>
        <p id="thisKitten"<p>Name: ${singleKitten.name}</p>
        <p id="ktnMood">Mood: ${singleKitten.mood}</p>
        <p id="ktnAffection">Affection: ${singleKitten.temperment}</p>
        <button id="${singleKitten.id}-btnPet" class="btn-cancel" onclick="pet('${singleKitten.id}')">Pet</button><button id="${singleKitten.id}-btnCatnip" class="m-2" onclick="catnip('${singleKitten.id}')">Catnip</button>
      </div >`

  })
  //debugger
  allKittenListElement.innerHTML = allKittensTemplate
  //document.getElementById(id).innerHTML
  //console.log(allKittensTemplate)
  //let value = findKittenById()
  //classChanges(value)


}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return allKittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let petKitten = findKittenById(id)
  //console.log(petKitten)
  //for (let i = 0; i < 1; i++)

  if (Math.random() >= 0.7) {
    petKitten.mood += 1
    if (petKitten.mood >= 8) {
      petKitten.mood = 8
      //setKittenMood()
    }
  } else {
    petKitten.mood -= 1
    if (petKitten.mood <= 0) {
      petKitten.mood = 0
      //setKittenMood()
    }

  }

  //let currentMood = petKitten.mood
  setKittenMood(id)

  //console.log(document.getElementById(petKitten.id + ""))
  //saveKittens()

  saveKittens(id)
  //console.log("pet")
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let resetMood = findKittenById(id)
  //console.log(resetMood)
  resetMood.mood = 5
  //console.log("mood reset")
  setKittenMood(id)
  saveKittens(id)
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(id) {

  let petKitten = findKittenById(id)
  //console.log(petKitten)
  let value = petKitten.mood
  //for (let i = 0; i < 1; i++) {
  if (value > 6) {
    //let happy = document.getElementById(petKitten.id + "");

    //console.log(document.getElementById(petKitten.id + ""))
    petKitten.temperment = "Happy"

    //console.log(happy)
    //setAttribute("style", "color:green")
    //happy.classList.add("happy.url")
    //happy.style.setProperty("-webkit-filter", "drop - shadow(2px 4px 6px #00ffb3)");

    //console.log(document.getElementById(petKitten.id + ""))
  }
  if (value > 3 && value < 7) {

    //console.log(document.getElementById(petKitten.id + ""))
    //document.getElementById("kImg").style.filter = "drop - shadow(2px 4px 6px #646464)";
    petKitten.temperment = "Tolerant"
  }
  if (value < 4 && value > 0) {

    petKitten.temperment = "Angry"
    // document.getElementById("kImg").style.filter = "drop - shadow(2px 4px 6px #ff0000) contrast(1)";
  }
  if (value == 0) {

    petKitten.temperment = "Ran Away"
    //document.getElementById(petKitten.id - btnPet + "").classList.add("hidden")
    //document.getElementById(petKitten.id - btnCatnip + "").classList.add("hidden")
    // document.getElementById("kImg").style.filter = "drop - shadow(2px 4px 6px #ff0000) contrast(0)";
    //removeElement()
    //console.log("disappear")
  }
  classChanges(id)
  //debugger
  //console.log(document.getElementById(petKitten.id + ""))
  //saveKittens()
}
//}

//TODO this won't save to the template.
function classChanges(id) {
  let kTemper = findKittenById(id)
  //console.log(kTemper)
  let value = kTemper.temperment

  //console.log(value)
  if (value == "Tolerant") {
    document.getElementById(kTemper.id + "").classList.remove("angry");
    document.getElementById(kTemper.id + "").classList.remove("happy");
    document.getElementById(kTemper.id + "").classList.add("kitten", "tolerant");
  }
  if (value == "Happy") {
    document.getElementById(kTemper.id + "").classList.remove("tolerant");
    document.getElementById(kTemper.id + "").classList.remove("angry");
    document.getElementById(kTemper.id + "").classList.add("kitten", "happy");
  }
  if (value == "Angry") {
    document.getElementById(kTemper.id + "").classList.remove("tolerant");
    document.getElementById(kTemper.id + "").classList.remove("happy");
    document.getElementById(kTemper.id + "").classList.add("kitten", "angry");
  }
  if (value == "Ran Away") {
    document.getElementById(kTemper.id + "").classList.remove("tolerant");
    document.getElementById(kTemper.id + "").classList.remove("angry");
    document.getElementById(kTemper.id + "").classList.remove("happy");
    document.getElementById(kTemper.id + "").classList.add("kitten", "gone");
    //document.getElementsById("" + "").classList.add("hidden")
    //document.getElementsById("" + "").classList.add("hidden")
  }
  //console.log(document.getElementById(kTemper.id + ""))

}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

function reset() {
  localStorage.clear()
  saveKittens()
}
