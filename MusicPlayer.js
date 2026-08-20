// VARIABLES
const NavToggle = document.getElementById("NavToggle");
const searchInput = document.getElementById("SearchBeat");
const Beat = document.getElementById("Beat")
const PlayPauseBtn = document.getElementById("PlayPauseBtn")
const PrevButton = document.getElementById("PrevBtn")
const NextButton = document.getElementById("NextBtn")
const ProgressBar = document.getElementById("ProgressBarFill");
const TimeDisplay = document.getElementById("TimeDisplay");
const DownloadBeatButton = document.getElementById("DownloadButton")
const AddToCartButton = document.getElementById("AddToCartButton")
const BeatName = document.getElementById("BeatTitle")
const BeatGenre = document.getElementById("BeatGenre")
let currentSongIndex = 1;
let isPlaying = false;
let cart = [];

                                        //EVENT LISTENERS
NavToggle.addEventListener('click', ()=>{
  popupMenu.style.display = "block"
})
searchInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value;
  const filteredSongs = searchPlaylist(searchTerm);
  displayResults(filteredSongs);
});
PlayPauseBtn.addEventListener('click', playPause);
PrevButton.addEventListener('click', playPreviousBeat);
NextButton.addEventListener('click', playNextBeat);
Beat.addEventListener('timeupdate', () => {
//    ProgressBar.value = Beat.currentTime;
    displayTime(TimeDisplay, Beat.duration, Beat.currentTime);
});
Beat.addEventListener('ended', () => {
    currentSongIndex++;
    if (currentSongIndex < playlist.length) {
        audio.src = playlist[currentSongIndex];
        audio.play(); // Start the next song
    }
});

ProgressBar.addEventListener('drag', () => {
    Beat.currentTime = ProgressBarBar.value;
});
//CloseButton.addEventListener('click', function CloseModal() {
//  LicenseModal.style.display = "none";
//  FreeBeatDownloadModal.style.display = "none";
//})


                                          // FUNCTIONS
function toggleMenu() {
  const menu = document.getElementById('popupMenu');
  menu.classList.toggle('open');
}

function loadBeat(currentSongIndex) {
  Beat.src = playlist[currentSongIndex].src;
  BeatName.innerHTML = playlist[currentSongIndex].title;
  BeatGenre.innerHTML = playlist[currentSongIndex].genre;
  Beat.load();
  // You might also want to update displayed song information
}

function addtocartModal() {
  LicenseModalContainer.style.display = "block"; 
  const BeatInformation = document.createElement("div");
  const BeatTitle = document.createElement("h1")
  BeatTitle.innerHTML = playlist[currentSongIndex].title;
  LicenseModal.appendChild(BeatInformation);
  LicenseModal.appendChild(BeatTitle);
}

//Playlist Controls
function playPause() {
  if (!isPlaying) {
    Beat.play();
    isPlaying = true;
    PlayPauseBtn.innerHTML = '<span> || </span>';
  } else {
    Beat.pause();
    isPlaying = false;
    PlayPauseBtn.innerHTML = '&#9654;';
  }
}


function playNextBeat() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length; // Loop back to start
  loadBeat(currentSongIndex);
  Beat.play();
  PlayPauseBtn.innerHTML = '<span> || </span>';
}

function playPreviousBeat() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length; // Handle negative index
  loadBeat(currentSongIndex);
  Beat.play();
  PlayPauseBtn.innerHTML = '<span> || </span>';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function displayTime(element, totalDuration, currentTime) {
    element.textContent = `${formatTime(currentTime)} / ${formatTime(totalDuration)}`;
    // 1. Calculate percentage
    const progressPercent = (currentTime / totalDuration) * 100;    
    // 2. Update the visual progress bar
    ProgressBar.style.width = `${progressPercent}%`;
}

function displayTracksFromPlaylist() {
  const BeatsPlaylist = document.getElementById("BeatsPlaylist")
  BeatsPlaylist.innerHTML = '';
 playlist.forEach((element, index)=>{
//    console.log(element, index);
    let DisplayPlaylist = document.createElement("div");
    const ActionsContainer = document.createElement("div")
    const AddToCartBtn = document.createElement("button");
    const DownloadBtn = document.createElement("button");
    AddToCartBtn.innerHTML = "&#x1F6D2;"
    AddToCartBtn.style.fontSize = "0.575rem"
    AddToCartBtn.style.width = "10vw"
    DownloadBtn.innerHTML = "&#x2193;"
    DownloadBtn.style.fontSize = "0.575rem"
    DownloadBtn.style.width = "10vw"
//        MusicInfodiv.classList.add("playlist");
    DisplayPlaylist.innerHTML =`<h1 class="BeatTitle"> ${element.title}</h1>
                                 <h1 id="BeatGenre"> ${element.genre}</h1>
                                 <h1 id="BeatDuration"> ${element.duration}</h1>`; 
    DisplayPlaylist.style.display = "grid";
    DisplayPlaylist.style.gridTemplateColumns ="1fr 1fr 1fr 1fr";
    DisplayPlaylist.style.justifyContent = "center";
    DisplayPlaylist.style.fontSize = "0.3rem"; /// I NEED TO GO OVER THIS!!!!
    ActionsContainer.appendChild(AddToCartBtn);
    ActionsContainer.appendChild(DownloadBtn);
    DisplayPlaylist.appendChild(ActionsContainer);
    BeatsPlaylist.appendChild(DisplayPlaylist);
    BeatsPlaylist.style.overflow = "scroll";
    BeatsPlaylist.style.scrollbarWidth = "none";
      AddToCartBtn.onclick = function() {
      LicenseModalContainer.style.display = "block";    
      LicenseModal.innerHTML = `<div id ="CloseModal" class="CloseButton" onclick= "closeModal()" style="margin-left: 60vw;" >×</div>
                                <h1 class="BeatTitle"> ${element.title}</h1>
                                <h1 id="BeatGenre"> ${element.genre}</h1>
                                <h1 id="BeatDuration"> ${element.duration}</h1>
                                <div id="LicensesInCart"> 
                                <div id="LicenseInCartContainer" style="display: flex; font-size: 0.350rem; justify-content: space-evenly; margin-top: 2.5vh;">
                                    <div class="DifferentLicenses">
                                        <h1 class="Licenses"> STANDARD </h1>
                                        <h1 class="LeasePrices"> ${element.licenses.mp3}</h1>
                                        <button id="MP3Lease" onclick = "AddToCart('${element.title}',${element.licenses.mp3})" data-id="1" data-name="MP3Lease" data-price="29" class="AddToCart">ADD TO CART</button>
                                    </div>
                                    <div class="DifferentLicenses">
                                        <h1 class="Licenses"> PREMIUM </h1>
                                        <h1 class="LeasePrices"> ${element.licenses.wav}</h1>
                                        <button id="WAVLease" onclick = "AddToCart('${element.title}',${element.licenses.wav})"  data-id="2" data-name="WAVLease" data-price="49" class="AddToCart">ADD TO CART</button>
                                    </div>
                                    <div class="DifferentLicenses">
                                        <h1 class="Licenses"> TRACKOUTS </h1>
                                        <h1 class="LeasePrices"> ${element.licenses.trackouts}</h1>
                                        <button id="TrackOutLease" onclick = "AddToCart('${element.title}',${element.licenses.trackouts})"  data-id="3" data-name="TrackOutLease" data-price="99" class="AddToCart">ADD TO CART</button>
                                    </div>         
                                </div>     
                                </div>`;
      };
      DownloadBtn.onclick = function() {
      DownloadModalContainer.style.display = "block";
      DownloadModal.innerHTML =  `
                                  <div id ="CloseModal" class="CloseButton" onclick= "closeModal()" style="margin-left: 60vw;" >×</div>
                                  <h1 class="BeatTitle"> ${element.title}</h1>
                                  <h1 id="BeatGenre"> ${element.genre}</h1>
                                  <h1 id="BeatDuration"> ${element.duration}</h1>
                                  <div id="DownloadFile">
                                  <div id="YoutubeSubscription">
                                      <h1>Subscribe To My Youtube</h1>
                                      <button onclick="subscribeToChannel()">Download Now</button>
                                  </div>`
      }
    })
}
displayTracksFromPlaylist()

//Search Through Playlist
function searchPlaylist(searchTerm) {
  // Normalize the search term for case-insensitive searching
  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

  if (!lowerCaseSearchTerm) {
     // Return the full playlist if the search term is empty
    return playlist;
  }

  return playlist.filter(song => {
    // Check if the search term is included in the song title or artist name
    const titleMatches = song.title.toLowerCase().includes(lowerCaseSearchTerm);
    const genreMatches = song.genre.toLowerCase().includes(lowerCaseSearchTerm);
    return titleMatches || genreMatches;
  });
}

function displayResults(results) {
  const resultsList = document.getElementById('BeatsPlaylist');
  resultsList.innerHTML = ''; // Clear previous results
  results.forEach(beat => {
    const li = document.createElement('div');
    const AddToCartBtn = document.createElement("button");
    const DownloadBtn = document.createElement("button");
    const ActionsContainer = document.createElement("div")
    AddToCartBtn.innerHTML = "&#x1F6D2;"
    AddToCartBtn.style.fontSize = "0.575rem"
    AddToCartBtn.style.width = "10vw"
    DownloadBtn.innerHTML = "&#x2193;"
    DownloadBtn.style.fontSize = "0.575rem"
    DownloadBtn.style.width = "10vw"
    li.innerHTML = `<h1 class="BeatTitle"> ${beat.title}</h1>
                    <h1 id="BeatGenre"> ${beat.genre}</h1>
                    <h1 id="BeatDuration"> ${beat.duration}</h1> 
                    `;
    resultsList.appendChild(li);
    ActionsContainer.appendChild(AddToCartBtn);
    ActionsContainer.appendChild(DownloadBtn);
    li.appendChild(ActionsContainer);
    li.style.display="grid";
    li.style.gridTemplateColumns ="1fr 1fr 1fr 1fr";
    li.style.justifyContent="space-between";
    li.style.fontSize = "0.3rem"; // I NEED TO GO OVER THIS!!!!
    AddToCartBtn.onclick = function() {
      LicenseModalContainer.style.display = "block";    
      LicenseModal.innerHTML = `<div id ="CloseModal" class="CloseButton" onclick= "closeModal()" style="margin-left: 60vw;" >×</div>
                                <h1 class="BeatTitle"> ${beat.title}</h1>
                                <h1 id="BeatGenre"> ${beat.genre}</h1>
                                <h1 id="BeatDuration"> ${beat.duration}</h1>
                                <div id="LicensesInCart"> 
                                <div id="LicenseInCartContainer" style="display: flex; font-size: 0.350rem; justify-content: space-evenly; margin-top: 2.5vh;">
                                    <div class="DifferentLicenses">
                                        <h1 class="Licenses"> STANDARD </h1>
                                        <h1 class="LeasePrices"> ${beat.licenses.mp3}</h1>
                                        <button id="MP3Lease" onclick = "AddToCart('${beat.title}',${beat.licenses.mp3})" data-id="1" data-name="MP3Lease" data-price="29" class="AddToCart">ADD TO CART</button>
                                    </div>
                                    <div class="DifferentLicenses">
                                        <h1 class="Licenses"> PREMIUM </h1>
                                        <h1 class="LeasePrices"> $49.99</h1>
                                        <button id="WAVLease" onclick = "AddToCart('${beat.title}',${beat.licenses.wav})"  data-id="2" data-name="WAVLease" data-price="49" class="AddToCart">ADD TO CART</button>
                                    </div>
                                    <div class="DifferentLicenses">
                                        <h1 class="Licenses"> TRACKOUTS </h1>
                                        <h1 class="LeasePrices"> $99.99</h1>
                                        <button id="TrackOutLease" onclick = "AddToCart('${beat.title}',${beat.licenses.trackouts})"  data-id="3" data-name="TrackOutLease" data-price="99" class="AddToCart">ADD TO CART</button>
                                    </div>         
                                </div>     
                                </div>`;
      };
      DownloadBtn.onclick = function() {
      DownloadModalContainer.style.display = "block";
      DownloadModal.innerHTML =  `
                                  <div id ="CloseModal" class="CloseButton" onclick= "closeModal()" style="margin-left: 60vw;" >×</div>
                                  <h1 class="BeatTitle"> ${beat.title}</h1>
                                  <h1 id="BeatGenre"> ${beat.genre}</h1>
                                  <h1 id="BeatDuration"> ${beat.duration}</h1>
                                  <div id="DownloadFile">
                                  <div id="YoutubeSubscription">
                                      <form action="post">
                                      <h1>Subscribe To My Youtube</h1>
                                      <button>Download Now</button>
                                      </form>
                                  </div>`
      }
  });
  MusicInfodiv.style.display="none";
}



function playFromPlaylist() {
    BeatsPlaylist.addEventListener("click",(e) => {
        if(e.target.classList.contains("BeatTitle")) {
          alert(e.target.innerHTML);
          const indexNum = playlist.findIndex((element, index, arr) => { 
            if (element.title === e.target.innerText) {
              return true;
            }
         });
          loadBeat(indexNum);
          Beat.play();
          PlayPauseBtn.innerHTML = '<span> || </span>'; 
//          PlaylistModal.style.display = "none";
        }
      }); 
}
// THIS FUNCTION CALL ALLOWS MUSIC/BEAT TO BE PLAYED ON CLICK!
playFromPlaylist(); 

/*function displayTime(element, totalDuration, currentTime) {
    element.textContent = `${formatTime(currentTime)} / ${formatTime(totalDuration)}`;
}*/
   
function AddToCart(name, price){
  // Check if item already exists to increment quantity
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  console.log(cart)
  alert('Item added to cart!')
  closeModal();
  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById('CartItems');
  const totalDisplay = document.getElementById('CartTotal');
  // Clear current list
  cartList.innerHTML = '';
  let total = 0;

  // Render each item
  cart.forEach(item => {
    const Items = document.createElement('div');
    Items.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    cartList.appendChild(Items);
    total += item.price * item.quantity;
  });
  totalDisplay.textContent = total.toFixed(2);
}

function closeModal() {
  LicenseModalContainer.style.display = "none";
  DownloadModalContainer.style.display = "none";
  CartPopUpContainer.style.display = "none";  
  popupMenu.style.display = "none";
}

// Subscribe To Youtube Channel For Beat Download

async function subscribeToChannel(targetChannelId, accessToken) {
    const url = 'https://googleapis.com';
    
    const body = {
        snippet: {
            resourceId: {
                kind: 'youtube#channel',
                channelId: targetChannelId
            }
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Subscription failed:', error);
            return;
        }

        const data = await response.json();
        console.log('Successfully subscribed:', data);
    } catch (err) {
        console.error('Network or Authorization error:', err);
    }
}


/* // Subscribe To NewsLetter Custom Form Submit Action
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
//    console.log(object);
    const json = JSON.stringify(object);
    form.style.display = "none";
    result.style.display = "block";
    result.innerHTML = "Please wait...";
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json // Send the JSON data
        });
        const data = await response.json(); // Parse the JSON response
            if (data.success) {
                result.innerHTML = "Form Submitted Successfully!";
                form.reset(); // Reset the form fields
            } else {
                result.innerHTML = data.message;
            }
    } 
    catch (error) {
        console.error('Error:', error);
        result.innerHTML = "Something went wrong!";
    }
}); */