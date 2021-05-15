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
            await loadScripts(arg.tabId)
        }
    }
    //#endregion

    browser.webNavigation.onDOMContentLoaded.addListener(onDOMContentLoaded)
}

browser.runtime.onMessage.addListener(async (msg: IMsg) => {
    browser.tabs.query({ active: true })
        .then(tabs => {
            tabs.forEach(tab => {
                if (tab.url) {
                    if (!tab.url.startsWith('http')) {
                        return
                    }
                    if (msg.addUrl) {
                        if (msg.addUrl === true) {
                            url_storage.add(tab.url)
                        } else {
                            url_storage.remove(tab.url)
                        }
                    }
                }
            })
        })
})