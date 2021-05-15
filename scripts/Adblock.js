function blockAds() {
    document.onclick = undefined
    var divs = document.getElementsByTagName('div')
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i]
        if (/ad-(\d.+)/g.test(div.id)) {
            div.style.display = 'none'
        }
    }
}

blockAds()
window.addEventListener('load', blockAds)
undefined
