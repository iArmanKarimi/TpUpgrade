function blockPopup() {
    document.onclick = undefined
    document.removeEventListener('click')
}

function blockAds() {
    blockPopup()
    var divs = document.getElementsByTagName('div')
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i]
        if (/ad-(\d.+)/g.test(div.id)) {
            div.style.display = 'none'
        }
    }
}

blockPopup()
window.addEventListener('load', blockAds)
undefined
