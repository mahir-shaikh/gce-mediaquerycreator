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
    document.getElementById('bootstrap-tooltip').dataset.tooltip = bootstrapConfig.tooltip;

    if (!bootstrapConfig.less || !bootstrapConfig.greater) {
        document.getElementById('bootstrapbetween-container').style.display = 'none';

        if (!bootstrapConfig.less) {
            document.getElementById('bootstraplessthan-container').style.display = 'none';
        } else {
            document.getElementById('bootstrapgreaterthan-container').style.display = 'none';
        }
    }

};

function getBootstrapWidth(screenwidth) {
    // let screenSizes = [576, 768, 992, 1200]
    let response = {
        less: null,
        greater: null,
        tooltip : null
    }
    if (screenwidth < 576) {
        response.greater = 575.98;
        response.tooltip = 'As per bootstrap breakpoints, your screen comes under the "X-Small" category, and the following media query can be used.'
    } else if (screenwidth < 768) {
        response.less = 576;
        response.greater = 767.98;
        response.tooltip = 'As per bootstrap breakpoints, your screen comes between the "sm" & "md" category, and the following media queries can be used.'
    } else if (screenwidth < 992) {
        response.less = 768;
        response.greater = 991.98
        response.tooltip = 'As per bootstrap breakpoints, your screen comes between the "md" & "lg" category, and the following media queries can be used.'

    } else if (screenwidth < 1200) {
        response.less = 992;
        response.greater = 1199.98;
        response.tooltip = 'As per bootstrap breakpoints, your screen comes between the "lg" & "xl" category, and the following media queries can be used.'

    } else {
        response.less = 1200;
        response.tooltip = 'As per bootstrap breakpoints, your screen comes above the "xl" category, and the following media query can be used.'
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

    const btns = document.querySelectorAll('button')

    btns.forEach(btn => {
        btn.addEventListener('click', event => {
            copyEl( event.target.dataset.id );
            updateTooltip(event.target)
        });
    });
});

function updateTooltip(target){
    target.dataset.tooltip = 'Copied!';
    target.addEventListener('mouseout',(event)=>{
        setTimeout(() => {
            target.dataset.tooltip = 'Copy to clipboard';
            target.removeEventListener('mouseout',()=>{});
        }, 200);
    })
    // setTimeout(() => {
    // }, 3000);
}

function copyEl(Id) {
    let range, sel;
    let Elem = document.getElementById(Id)

    // Ensure that range and selection are supported by the browsers
    if (document.createRange && window.getSelection) {

        range = document.createRange();
        sel = window.getSelection();
        // unselect any element in the page
        sel.removeAllRanges();

        try {
            range.selectNodeContents(Elem);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(Elem);
            sel.addRange(range);
        }

        document.execCommand('copy');
    }

    sel.removeAllRanges();

};

