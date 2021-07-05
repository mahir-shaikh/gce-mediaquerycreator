// // import {obj} from './window-script'
// // var WindowHeight = require('./window-script').height//obj.height////window.innerHeight
// // var WindowWidth = require('./window-script').width//obj.width////window.innerWidth

// // window.gce
// function setData(){
//     console.log('inside setData')
//     // const resultElem = document.getElementById("result")
//     // console.log(resultElem)
//     // resultElem.innerHTML = `
//     // <div class="">Width: ${WindowWidth}</div>
//     // <div class="">Height: ${WindowHeight}</div>
//     // `

// }

// console.log('inside popup-script.js', window.gce)
// console.log('height', WindowHeight)
// console.log('width', WindowWidth)

// Update the relevant fields with the new data.
const setDOMInfo = info => {
    document.getElementById('total').textContent = info.total;
    document.getElementById('inputs').textContent = info.inputs;
    document.getElementById('buttons').textContent = info.buttons;
    document.getElementById('width').textContent = info.width;
    document.getElementById('height').textContent = info.height;
};

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            { from: 'popup', subject: 'DOMInfo' },
            // ...also specifying a callback to be called 
            //    from the receiving end (content script).
            setDOMInfo);
    });
});