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
    document.getElementById('width').textContent = info.width;
    document.getElementById('height').textContent = info.height;

    document.getElementById('exactwidth').textContent = info.width;
    document.getElementById('widthlessthan').textContent = info.width + 1;
    document.getElementById('widthgreaterthan').textContent = info.width - 1;

    document.getElementById('exactheight').textContent = info.height;
    document.getElementById('heightlessthan').textContent = info.height + 1;
    document.getElementById('heightgreaterthan').textContent = info.height - 1;

    document.getElementById('bootstraplessthan').textContent = getBootstrapWidth(info.width).less;
    document.getElementById('bootstrapgreaterthan').textContent = getBootstrapWidth(info.width).greater;
    document.getElementById('bootstrapbetweengreater').textContent = getBootstrapWidth(info.width).greater;
    document.getElementById('bootstrapbetweenless').textContent = getBootstrapWidth(info.width).less;

    let bootstrapConfig = getBootstrapWidth(info.width)
    if(!bootstrapConfig.less || !bootstrapConfig.greater){
        document.getElementById('bootstrapbetween-container').style.display = 'none';
        
        if(!bootstrapConfig.less){
            document.getElementById('bootstraplessthan-container').style.display = 'none';
        }else{
            document.getElementById('bootstrapgreaterthan-container').style.display = 'none';
        }
    }
    
};

function getBootstrapWidth(screenwidth){
    // let screenSizes = [576, 768, 992, 1200]
    let response = {
        less: null,
        greater: null
    }
    if(screenwidth < 576){
        response.greater = 575.98;
    }else if(screenwidth < 768){
        response.less = 576;
        response.greater = 767.98;
    }else if(screenwidth < 992){
        response.less = 768;
        response.greater = 991.98
    }else if(screenwidth < 1200){
        response.less = 992;
        response.greater = 1199.98;
    }else{
        response.less = 1200;
    }

    return response
}

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