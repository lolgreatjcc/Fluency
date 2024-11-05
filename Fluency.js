
const head = document.querySelector("head");
let css = document.createElement("link");
css.setAttribute("rel", "stylesheet");
css.setAttribute("href", browser.runtime.getURL("index.css"));
head.appendChild(css);

const list_of_funny_loading_messagges = [
  "Loading...",
  "Constructing additional pylons...",
  "Generating witty dialog...",
  "Swapping time and space...",
  "Spinning violently around the y-axis...",
  "(Pay no attention to the man behind the curtain)",
  "We're testing your patience",
  "It's not you. It's me.",
  "Let's take a mindfulness minute...",
  "Convincing AI not to turn evil..",
  "Please wait while the intern refills his coffee.",
  "@todo Insert witty loading message",
  "Please wait... Consulting the manual...",
  "Patience! This is difficult, you know...",
  "Do you like my loading animation? I made it myself",
  "No, I'm awake. I was just resting my eyes.",
  "One mississippi, two mississippi..."


]


const fetchHTML = async (url) => {
  const response = await fetch(url);
  const html = await response.text();
  document.body.insertAdjacentHTML("beforeend", html);

  let fluencyContainer = document.querySelector(".fluency-container");
  fluencyContainer.style.bottom = "-400px";

  anime({
    targets: '.fluency-container',
    easing: 'easeOutQuart',
    bottom: 0,
    duration: 1200,
  });


  // returns path d after all:revert
  document.querySelectorAll('path').forEach(path => {
    const data = path.getAttribute('d').replace(/\s+/g, ' '),
          cssData = `path("${data}")`;
    path.style.d = cssData;
  });

  // 
  let pasteButton = document.querySelector("#fluencyPasteButton");
  pasteButton.addEventListener("click",async (e) => {
    let value = await navigator.clipboard.readText()
    let fluencyInput = document.querySelector("#fluencyInput");
    fluencyInput.value = value;

  })

  //
  let copyButton = document.querySelector("#fluencyCopyButton");
  copyButton.addEventListener("click",async (e) => {
    let fluencyOutput = document.querySelector("#fluencyOutput");

    if(fluencyOutput.innerHTML !== ""){
      await navigator.clipboard.writeText(fluencyOutput.innerHTML)
    }

  })

  //hides the page
  







}

const index = browser.runtime.getURL('index.html')



const fluencyScript = async () => {

  await fetchHTML(index);

  
  let fluencyInput = document.querySelector("#fluencyInput");


  fluencyInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      let fluencyInput = document.querySelector("#fluencyInput");
      fluencyInput.setAttribute("disabled", true);

      let chatGPTtag = document.querySelector("#fluencyTag");
      chatGPTtag.style.display = "none"
      
      let fluencyLoadingText = document.querySelector("#fluencyFunLoadingText");
      fluencyLoadingText.innerHTML = list_of_funny_loading_messagges[Math.floor(Math.random() * list_of_funny_loading_messagges.length)];

      let fluencyLoadingContainer = document.querySelector("#fluencyLoadingContainer");
      fluencyLoadingContainer.style.display = "flex";

      e.preventDefault();
      let response = browser.runtime.sendMessage({ command: 'fluencyCallGPT', fluencyInput: e.target.value });
      response.then((res) => {
        let fluencyOutput = document.querySelector("#fluencyOutput");
        fluencyOutput.innerHTML = res.choices[0].message.content;

        let fluencyInput = document.querySelector("#fluencyInput");
        fluencyInput.removeAttribute("disabled");

        let chatGPTtag = document.querySelector("#fluencyTag");
        chatGPTtag.style.display = "none"

        let fluencyLoadingContainer = document.querySelector("#fluencyLoadingContainer");
        fluencyLoadingContainer.style.display = "none";
      })
    
    }

    
  });

};



fluencyScript();



