const CreateFrag = new DocumentFragment();
const NM = document.querySelector('.page__header');
//selecting scroll to top buttin
const mybutton = document.querySelector('.btn');
//timer to hide navigation bar
let TimerToHide = null;
// selecting ul
const NavBarList = document.getElementById('navbar__list');
// select all sections in the page
const SectionElements = document.querySelectorAll("section");




//loop through the sections to add them to ul
 
// I used webinar tutorial from FWD to do most of this part

for (let j = 0; j < SectionElements.length; j++) {
  // create li and link element
  const li = document.createElement("li");

  const HyberLinks = document.createElement("a");

  HyberLinks.classList.add("menu__link");

  li.classList.add("li_");
  // add link to li

  li.appendChild(HyberLinks);
  //add li to fragment 

  CreateFrag.appendChild(li);

  // Linking the sections 

  //adding href to links
  HyberLinks.setAttribute('href', SectionElements[j].getAttribute("id"));
  //adding text to link
  HyberLinks.innerHTML = SectionElements[j].getAttribute("data-nav");



  HyberLinks.addEventListener("click", ClickEvent);

  // adding click event to each link to its associated section

  function ClickEvent(event) {
    

    event.preventDefault();

    const ElementToSCrollTo = document.getElementById(SectionElements[j].getAttribute("id"));
    ElementToSCrollTo.scrollIntoView({ behavior: "smooth" });

  }


}
NavBarList.appendChild(CreateFrag);




//scrolling event
window.addEventListener('scroll', function () {
  
  //highlight active section
  ActiveSection();

  //Navigation hiding function
  HideNav();
  //show scro llto up button
  ShowBtn();
  //looping to add ur active class and active class to highlight active section in navigation

})
// scroll to top  button
// I used a youtube tutorial for this part
mybutton.addEventListener("click", function () {
  document.body.scrollTop = 0; 
  

});
/*
// this was an attempt to make section collasible

const colls = document.getElementsByClassName("collapsible");
for (coll of colls) {
  coll.addEventListener("click", function () {
    console.log("c");

    const SectionContent = this.nextElementSibling;
    if (SectionContent.style.display === "none") {
      SectionContent.style.display = "block";
    } else {
      SectionContent.style.display = "none";
    }

  });
}*/


// hide navigation after 5 seconds of not scrolling

// to use Settimeout function I used a tutorial from W3School
function HideNav() {
  
  
 // check if timer is none if no we hide the navigation, the hide navigation is hidden after 5 seconds 
  if (TimerToHide !== null) {
    //console.log (window.innerWidth);
    NM.style.top = '0';
     // check if screen is desktop or smaller if smaller the header is a side menu so it disapears to left and the sections get padded when it appears
    if (window.innerWidth <= 600){
      
      NM.style.left ='0';
    
      for (section of SectionElements){
        
        
        section.style.paddingLeft = '120px';
        
      }
    
    }
    
    
    clearTimeout(TimerToHide);
  }
  TimerToHide = setTimeout(function () {
    
    NM.style.top = '-60px';
    if (window.innerWidth <= 600){
      
    NM.style.left ='-200';
    NM.style.top ='0';
    for (section of SectionElements){
      section.style.paddingLeft = '0px';
    }
  }
    

  }, 5000);
}
// making scroll to top button appear 
function ShowBtn() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
//checking which element is active to highlight in navigation

// to do this Parts I watched both youtube Tutorial and FWD Tutorial and help from the instructor
function ActiveSection() {
  const Edit = {
    root : null,
    threshold: [0.65, 1], // instructor helped me in this part to remove the bug thatmade sections behave wrong on click of links 
    rootMargin:'0px'
  };
  const Hyperlinks = document.querySelectorAll("a.menu__link");

  //check if we are at top of page if yes remove active from all
 if ( document.body.scrollTop==0){
   for (section of SectionElements){
  section.classList.remove('your-active-class');}
  for (const link of Hyperlinks) {
    link.classList.remove("highlight");
  }

 }
  
 // if we are not on top observe sections for active section
  //observing sections 

  const obs = new IntersectionObserver(function (entries,
    obs) {
    const IsIntersectiong = entries[0].isIntersecting;
    if (IsIntersectiong) {
      entries[0].target.classList.add('your-active-class');

      for (const link of Hyperlinks) {
        link.classList.remove("highlight");
        //comparing link to section to select the link associated with section
        if (link.textContent == entries[0].target.dataset.nav) {
          link.classList.add("highlight");

        }
        else {
          link.classList.remove("highlight");

        }
      }


    }
    else {
      entries[0].target.classList.remove('your-active-class');
    }

  }

    , Edit);



  for (let j = 0; j < SectionElements.length; j++) {
    
    obs.observe(SectionElements[j]);



  }
}




