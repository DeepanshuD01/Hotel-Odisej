function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotive();

function swiperWorking(){
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type:"fraction"
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  });
  
}
swiperWorking();

var tl = gsap.timeline();
tl.from("#page1 svg",{
  y:-50,
  delay:0.3,
  duaration:0.5,
  opacity:0
})
 .from("#page1 img",{
    scale:0.5,
    duaration:1,
    borderRadius:"10px",
    ease: Power4.easeOut
 })
 .from("nav",{
  y:-50,
  duaration:0.6,
  opacity:0
 })

var h2Data = document.querySelectorAll("#page2 #center h2")
  h2Data.forEach(function(elem){
    var textData = elem.textContent
    var splittedData = textData.split("")
    var clutter = ""
    splittedData.forEach(function(e){
      clutter += `<span>${e}</span>`
    })
    elem.innerHTML = clutter
})
gsap.to("#page2 #center h2 span",{
    color:"#E3E3C4",
    stagger:0.2,
    scrollTrigger:{
      trigger:"#page2 #center h2 span",
      scroller:"#main",
      // markers:true,
      start:"top 60%",
      end:"top 5%",
      scrub:2
    }
  })

var tl2 = gsap.timeline({
  scrollTrigger:{
    trigger:"#page6-left",
    scroller:"#main",
    start:"top 50%",
    end:"top 35%",
    // markers:true,
    scrub:2
  }
})
tl2.to("#page6-left",{
  transform:"translateX(-20%)",
  duration:1,
},"anim2")
tl2.to("#page6-right",{
  transform:"translateX(20%)",
  duration:1,
},"anim2")
tl2.from("#page6-center",{
  transform:"translateY(30%)",
  duration:1,
  opacity:0
},"anim2")

gsap.to("#page2 #svg2,#page2 #svg3",{
  left:"-100vw",
  scrollTrigger:{
    trigger:"#page2 #svg2",
    scroller:"#main",
    scrub:2,
  }
})
