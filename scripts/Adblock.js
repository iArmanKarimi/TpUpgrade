function blockAds() {
    var divs = document.getElementsByTagName('div')
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i]
        var isAd = /ad-(\d.+)/g.test(div.id)
        if (isAd) div.style.display = 'none'
    }
}

window.open = function () { }
window.onload = blockAds
console.log(window)
undefined