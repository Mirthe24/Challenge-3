

/**
  Fetch API data
 */
function getAPIdata() {
	var url = 'https://rest.bandsintown.com/artists';
  var artiest = document.getElementById('artiest').value;
  var request = url + '/' + artiest + '/' + 'events?app_id=c7260e22db3fff1033091fa955c872a8&date=upcoming';


	fetch(request)

	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})

	// maak tabel met info
	.then(function(response) {
		//console.log(response);
		var informationBox = document.getElementById('land');
		informationBox.innerHTML = ''; //maak het zoekresultaten leeg voordat iemand iets nieuws zoekt

		var info = response;

		//loop met tabel

		for(var i=0; i< info.length; i++){
		var a = (info[i].datetime); //datum
		var venueName = (info[i].venue.name); //venue naam
		var cities = (info[i].venue.city); //stad
		var countries = (info[i].venue.country); //land
		var ticketsLink = (info[i].url); //tickets kopen

		var day = new Date(a);
	

		informationBox.innerHTML += '<tr> <td class="date">' /*tabel gemaakt van de informatie */ + 
		( day.toLocaleDateString("en-US", { month: 'short' }) 
       	+ "\xa0"+ day.toLocaleDateString("en-US", { day: '2-digit' }) 
        + "\xa0 " + day.toLocaleDateString("en-US", { year: 'numeric' })  ) /*alleen de datum, niet de tijd en de datum in text krijgen ipv cijfers*/

		+ '</td> <td class="place"> <h3>' + venueName
		+ '</h3>'+ cities
		+ ',\xa0' + countries
		+'</td> <td class="ticket"> <a href="' + ticketsLink +'" target="_blank"> GET TICKETS </a></td> </tr>' /*button gemaakt van de link */;

		}
		console.log(response);	



	//map

	// api token
mapboxgl.accessToken = 'pk.eyJ1IjoibWlydGhlMjQiLCJhIjoiY2s4dmltdm4zMDBwNDNmbnc5YmF3YWF0cCJ9.KgVWV1_bRC9Ml_-00B1DJw';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mirthe24/ck8zv9wmm0ru81imn7arbiu9w',
  center: [0, 30],
   zoom: 1,

});

var mapBox = document.getElementById('map')

		// als er geen evenementen zijn
		
	if (a == null){
	informationBox.innerHTML += '<p> There aren\'t any events at the moment.</p>';
	mapBox.style.display = "none";
	var title = document.getElementById('title');
		var titleWork = title.innerHTML = '';

		var title2 = document.getElementById('title2');
		title2.innerHTML =  '';
		}
	else if (a !== null){
		mapBox.style.display = "block";
		var title = document.getElementById('title');
		var titleWork = title.innerHTML = info[0].artist.name;

		var title2 = document.getElementById('title2');
		title2.innerHTML =  info[0].artist.upcoming_event_count + '\xa0upcoming events'
	}


// marker toevoegen


for(var i=0; i< info.length; i++){
	var lat = (info[i].venue.latitude);
	var lon = (info[i].venue.longitude)
var marker = new mapboxgl.Marker()
  .setLngLat([lon, lat])
  .addTo(map);
}



	})


}

function onAPISucces(response) {

	var artistList = response.list;
	
}

/**
 * Error
 */
function updateUIError() {
	var countryBox = document.getElementById('land');
	countryBox.className = 'hidden';
}



function introText(){
var intro = document.getElementById('intro');

intro.classList.add('afterSearch');
}


function searchBar(){
var bar = document.getElementById('artiest');

bar.classList.add('afterSearch');
}

function searchButton(){
var search = document.getElementById('form');

search.classList.add('afterSearch');
}