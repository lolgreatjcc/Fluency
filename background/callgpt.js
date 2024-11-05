// let fluencyInput = document.querySelector("#fluencyInput");

// fluencyInput.addEventListener("keydown", (e) => {
//   if (e.keyCode === 13 && e.shiftKey === false) {
//     e.preventDefault();
//     fetch("https://www.example.com", {
//       method: "GET",
//       mode: "cors"
//       // body: JSON.stringify({

//       //   "model": "gpt-3.5-turbo",
//       //   "messages": [{ "role": "user", "content": "Say 'This is a test'" }],
//       //   "stream": false

//       // })
//     }).then((res) => {
//         console.log(res);
//       })
//   }
// });

const insertOpenAIKeyHere = "";

(function () {

  const requestBody = (userInput) => {
    return {
    "model": "gpt-3.5-turbo",
    "messages": [{ "role": "user", "content": `Rephrase '${userInput}' for fluency.` }],
    "stream": false
    }
  }

  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "fluencyCallGPT") {

      
      fetch("	https://api.openai.com/v1/chat/completions", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + insertOpenAIKeyHere
        },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(requestBody(request.fluencyInput))
      }).then(async (res) => {
        let response = await res.json();
        sendResponse(response);

      })

    }
    return true;
  });


})()

