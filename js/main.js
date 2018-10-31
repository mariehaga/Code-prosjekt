/* prøver en my måte for slides  */

let sliderImages = document.querySelectorAll(".slide"),
  arrowLeft = document.querySelector("#arrow-left"),
  arrowRight = document.querySelector("#arrow-right"),
  current = 0;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

// Init slider
function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
}

// Show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function() {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow  click
arrowRight.addEventListener("click", function() {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();







/*  ----En måte for slides ---

var i = 0; 			
var images = [];	
var time = 3000;	
	 

images[0] = "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=81a5f1725ca68c549e0054dcfdf269de&auto=format&fit=crop&w=750&q=80";
images[1] = "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=483e72cc532caf940f4885ba2e9e9418&auto=format&fit=crop&w=750&q=80";
images[2] = "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=01a9a264e737622958245b0f55a6e943&auto=format&fit=crop&w=668&q=80";
images[3] = "https://images.unsplash.com/photo-1506701234424-ef06760d8c8e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=936e1dfe17a85554008d1fe1995f055a&auto=format&fit=crop&w=750&q=80";


function changeImg(){
	document.slide.src = images[i];
	
	if(i < images.length - 1){
	  
	  i++; 
	} else { 
		
		i = 0;
	}

	setTimeout("changeImg()", time);
}

window.onload=changeImg;

*/