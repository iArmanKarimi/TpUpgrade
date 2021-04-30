const loadLibs = async (tabId: number) => { }

const loadScripts = async (tabId: number) => {
    await browser.tabs.executeScript(tabId, { file: 'scripts/Adblock.js' })
}

const initBrowserHandlers = () => {
    //#region handlers
    const onDOMContentLoaded = async (arg: {
        tabId: number;
        url: string;
        processId: number;
        frameId: number;
        timeStamp: number;
    }): Promise<void> => {
        if (await url_storage.exists(arg.url)) {
            console.debug(`url ${arg.url} exists. blocking ads.`)
            await loadScripts(arg.tabId)
        } else {
            console.debug(`url ${arg.url} doesn't exists.`)
        }
    }
    //#endregion

    browser.webNavigation.onDOMContentLoaded.addListener(onDOMContentLoaded)
}

browser.runtime.onMessage.addListener(async (add: boolean | object) => {
    browser.tabs.query({ active: true })
        .then(tabs => {
            tabs.forEach(tab => {
                if (tab.url) {
                    if (!tab.url.startsWith('http')) {
                        return
                    }
                    if (add === true) {
                        url_storage.add(tab.url)
                    }
                    if (add === false) {
                        url_storage.remove(tab.url)
                    }
                }
            })
        })
})