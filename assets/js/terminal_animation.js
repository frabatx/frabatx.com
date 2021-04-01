// DEFINIZIONI
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "play reverse play reverse",
  start:"top 90%",
  end:"bottom 40%"
});

// Frasi
const firstSentence = "Hi! I'm "
const secondSentence = ["Francesco", "Frabatx"]
const introduceEditor = "Sorry, let's use some text editor!"

const prima ="Hey, I'm Francesco Battista but you can call me Frabatx<br>"
const seconda = "I’m a software developer, or at least I try<br>"
const terza = "I don’t want to waste too much of your time, so I’m gonna let you explore my life.<br>"
const quarta = "Have fun!"


// ANIMAZIONE CURSORE
let cursor = gsap.to('#cursor', {opacity: 0, ease: "power2.inOut", repeat: -1})

// ANIMAZIONE TERMINALE
let terminalTl = gsap.timeline().addLabel("animazione-terminale");

terminalTl.to('.wrapper', {duration:0.5, width: "70vw", delay: 0.5, ease: "power4.inOut"})
           .to('.wrapper', {duration:0.5, height: "70vh", delay: 0.5, ease: "power4.inOut"})
           .from('#codename', {duration: 1, x: "-40vw" , ease: "power3.out"})
           .set('#cursor', {visibility: "visible"})

// ANIMAZIONE HI, I'M
let firstSentenceTl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 3}).addLabel("animazione-hi");
firstSentenceTl.to('#im', {duration: 1,text:firstSentence,onComplete: ()=>secondSentenceTl.play()})

// ANIMAZIONE FRANCESCO FRABATX
let secondSentenceTl = gsap.timeline().addLabel("animazione-frabatx").pause();

secondSentence.forEach(word =>{
  let tl = gsap.timeline({repeat: 1, yoyo: true , repeatDelay:.5});
  tl.to('#target', {duration: .5, text:word})
  secondSentenceTl.add(tl);
})

// ANIMAZIONE INTRODUZIONE
let introduceEditorTl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 1}).addLabel("animazione-introduzione");
introduceEditorTl.to('#im', {duration: 2, text:introduceEditor})

// ANIMAZIONE VIM
let vimTl = gsap.timeline().addLabel("animazione-vim");
vimTl.to('#im', {duration: 1.5, 
                 text: "vim presentation.txt"})
vimTl.addPause(">1", clearEditor, [true])

// ANIMAZIONE TEXT IN VIM
let primaTl = gsap.timeline();
let secondaTl = gsap.timeline();
let terzaTl = gsap.timeline();
let quartaTl = gsap.timeline();
let lastSentenceTl = gsap.timeline();

primaTl.to('#prima', {duration: 3, text:prima, onComplete: removeSpanRows, onCompleteParams: [2]})
secondaTl.to('#seconda', {duration: 3, text:seconda, onComplete: removeSpanRows, onCompleteParams: [2]})
terzaTl.to('#terza', {duration: 5, text:terza, onComplete: removeSpanRows, onCompleteParams: [3]})
quartaTl.to('#quarta', {duration: 2, text:quarta, onComplete: removeSpanRows, onCompleteParams: [2]})
quartaTl.addPause(">2", clearEditor, [false])

// ANIMAZINOE HUGO SERVER
lastSentenceTl.to('#target', {duration: 1.5, text: "hugo server"})
lastSentenceTl.addPause(">2");

// ANIMAZIONE CHIUSURA TERMINALE
let terminalFineTl = gsap.timeline();

terminalFineTl.set('#codename, #cursor, #target,#im, #prima, #seconda,#terza,#quarta', {duration:1,visibility: "hidden"})
              .to('.wrapper', {duration:0.5, width: "1vw", delay: 0.5, ease: "power4.inOut"})
              .to('.wrapper', {duration:0.5, height: "0", delay: 0.5, ease: "power4.inOut"})
              .set('#btn-skip',{display: "none"})
              .set('.container-animation', {duration: 1, opacity: 0})
              .set('.container-animation', {display: "none"})
              // .set('.wrapper', {display: "none"})
              .to('.fixed-stick', {duration: 1, opacity: 1})
              .to('.main, .main-minus', {duration: 1, 
                opacity: 1, 
                display: "block",
                onComplete: scroll
              })

// ANIMAZIONE BUBBLE PULSE
var bubblePulseTl = gsap.timeline({repeat: -1})

bubblePulseTl.to(".bubble-pulse",{duration: 0.5, scale: 0.9, opacity: 1})
             .to(".bubble-pulse",{duration: 1.1,scale: 2,opacity: 0})       
             

// MASTER TIMELINE
let masterTl = gsap.timeline()
masterTl.add(terminalTl)
        .add(firstSentenceTl)
        .add(introduceEditorTl)
        .add(vimTl)
        .add(primaTl)
        .add(secondaTl)
        .add(terzaTl)
        .add(quartaTl)
        .add(lastSentenceTl)
        .add("last")
        .add(terminalFineTl)
        .add(bubblePulseTl)


// ADDICTIONAL FUNCTIONS
function removeSpanRows(loop){
  var x = document.getElementById('rows');
  for(i = 0; i < (loop*2); i++){
    x.children[0].remove();
  }
}
function clearEditor(rows){
  let string = '';
  $('#codename').empty()
  $('#im').empty()
  $('#prima').empty()
  $('#seconda').empty()
  $('#target').empty()
  $('#terza').empty()
  $('#quarta').empty()
  if(rows){
      var element = document.getElementById('background-layer');
      var divHeight = element.offsetHeight;
      var lineHeight = parseInt(document.defaultView.getComputedStyle(element, null).getPropertyValue("line-height"));
      var lines = divHeight / lineHeight;
      for(i =0 ; i< (lines-5); i++){
          string += '<span>~</span><br>'
      }
      $('#rows').html(string)
  
  }else{
      $('#rows').empty() 
      $('#codename').html("[frabatx@admin]$: >") 
  }
}

// SKIP ANIMATION
$("#btn-skip").on('click', ()=>{
  console.log('skippo');
  clearEditor(false);
  masterTl.seek("last");
})

function scroll(){
  
  // CURRICULUM
  gsap.to("#intro-cv", {
    scrollTrigger:{trigger: "#intro-cv"}, 
    duration: 2,
    visibility:"visible",
    text: `&ltp&gt My experiences &lt/p&gt`
  });

  gsap.to("#cv", {
    scrollTrigger:{trigger: "#cv"}, 
    duration: 2,
    visibility:"visible",
    text: `.CurriculumVitae('*')`
  });

  gsap.to(".bubble-pulse", {
    scrollTrigger:{trigger: "#cv"}, 
    backgroundColor: "#FFB800"
  });

  gsap.to("#desc-cv", {
    scrollTrigger:{trigger: "#desc-cv"}, 
    duration: 2,
    visibility:"visible",
    text: `&ltp&gt 
            Spoiler! More studies than work experience 
            &lt/p&gt`
  });

  // ITALIAN ARMY

  gsap.to("#army", {
    scrollTrigger:{trigger: "#army"}, 
    duration: 2,
    visibility:"visible",
    text: `.ItalianArmy(0)`
  });
  gsap.to("#years-army", {
    scrollTrigger:{trigger: "#years-army"}, 
    duration: 2,
    visibility:"visible",
    text: `<2012-2015>`
  });
  gsap.to("#desc-army", {
    scrollTrigger:{trigger: "#desc-army"}, 
    duration: 2,
    visibility:"visible",
    text: `Once I graduated, I joined the Italian army. 
    An extraordinary experience that led me to grow and visit different places in Italy!`
  });

}