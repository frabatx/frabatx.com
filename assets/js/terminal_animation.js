// Frasi
const firstSentence = "Hi! I'm "
const secondSentence = ["Francesco", "Frabatx"]
const introduceEditor = "Sorry, let's use some text editor!"

const prima ="Hey, I'm Francesco Battista but you can call me Frabatx<br>"
const seconda = "I’m a software developer, or at least I try<br>"
const terza = "I don’t want to waste too much of your time, so I’m gonna let you explore my life.<br>"
const quarta = "Have fun!"


// Animazione cursore
let cursor = gsap.to('#cursor', {opacity: 0, ease: "power2.inOut", repeat: -1})

// Animazione terminale
let terminalTl = gsap.timeline();

terminalTl.to('.wrapper', {duration:0.5, width: "70vw", delay: 0.5, ease: "power4.inOut"})
           .to('.wrapper', {duration:0.5, height: "70vh", delay: 0.5, ease: "power4.inOut"})
           .from('#codename', {duration: 1, x: "-30vw" , ease: "power3.out"})
           .set('#cursor', {visibility: "visible"})

// Animazione Hi
let firstSentenceTl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 3});
firstSentenceTl.to('#im', {duration: 1,text:firstSentence,onComplete: ()=>secondSentenceTl.play()})

// Animazione francesco
let secondSentenceTl = gsap.timeline().pause();
// Aggiungo al target le words da inserire

secondSentence.forEach(word =>{
  let tl = gsap.timeline({repeat: 1, yoyo: true , repeatDelay:.5});
  tl.to('#target', {duration: .5, text:word})
  secondSentenceTl.add(tl);
})

//Animazione introduzione
let introduceEditorTl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 1})
introduceEditorTl.to('#im', {duration: 2, 
                             text:introduceEditor
                            })

// Animazione apertura vim
let vimTl = gsap.timeline()
vimTl.to('#im', {duration: 1.5, 
                 text: "vim presentation.txt"})
vimTl.addPause(">1", clearEditor, [true])

// Animazione text in vim
let primaTl = gsap.timeline();
let secondaTl = gsap.timeline();
let terzaTl = gsap.timeline();
let quartaTl = gsap.timeline();
let lastSentenceTl = gsap.timeline();

primaTl.to('#prima', {duration: 3, text:prima, onComplete: removeSpanRows, onCompleteParams: [1]})
secondaTl.to('#seconda', {duration: 3, text:seconda, onComplete: removeSpanRows, onCompleteParams: [1]})
terzaTl.to('#terza', {duration: 5, text:terza, onComplete: removeSpanRows, onCompleteParams: [2]})
quartaTl.to('#quarta', {duration: 2, text:quarta, onComplete: removeSpanRows, onCompleteParams: [1]})
quartaTl.addPause(">2", clearEditor, [false])

// Animazione lancio server
lastSentenceTl.to('#target', {duration: 1.5, text: "hugo server"})
lastSentenceTl.addPause(">2");

// Animazione terminale chiusura
let terminalFineTl = gsap.timeline();

terminalFineTl.set('#codename, #cursor, #target', {duration:1,visibility: "hidden"})
              .to('.wrapper', {duration:0.5, width: "1vw", delay: 0.5, ease: "power4.inOut"})
              .to('.wrapper', {duration:0.5, height: "0", delay: 0.5, ease: "power4.inOut"})
              .set('.terminal-container', {display: "none"})
              .set('.wrapper', {display: "none"})
              .set('.main', {duration: 1, visibility: "visible", display: "block"})
           

// Creo una master Timeline che aggancia tutte le sequenze una dopo l'altra
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
        .add(terminalFineTl)


// Funzioni addizionali
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


