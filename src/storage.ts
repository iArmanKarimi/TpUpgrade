const storage = {
    set: async function (key: string, value: browser.storage.StorageValue) {
        await browser.storage.local.set({ [key]: value })
    },
    setObj: async function (obj: browser.storage.StorageObject) {
        await browser.storage.local.set(obj)
    },
    get: async function (key: string) {
        return (await browser.storage.local.get(key))[key]
    },
    clear: async function () {
        await browser.storage.local.clear()
        this.init()
    },
    remove: async function (keys: string | string[]) {
        await browser.storage.local.remove(keys)
    },
    init: function () {
        this.setObj({})
        this.get(this.KEYS.URLS)
            .then((urls: any) => {
                if (!urls) {
                    this.set(this.KEYS.URLS, [])
                }
            })
    },
    KEYS: {
        URLS: 'TP_CHATROOM_URLS'
    }
}

const url_storage = {
    add: async function (url: string): Promise<void> {
        const urls: Array<string> = Array.from(await storage.get(storage.KEYS.URLS) as any)
        urls.push(url)
        storage.set(storage.KEYS.URLS, urls)
    },
    remove: async function (url: string): Promise<void> {
        const urls: Array<string> = Array.from(await storage.get(storage.KEYS.URLS) as any)
        const index: number = urls.indexOf(url)
        if (index < 0) {
            return
        }
        urls.splice(index, 1)
        storage.set(storage.KEYS.URLS, urls)
    },
    exists: async function (url: string): Promise<boolean> {
        const getHostName = (url: string): string => new URL(url).hostname
        const urls: Array<string> = Array.from(await storage.get(storage.KEYS.URLS) as any)
        return urls.some(_url => {
            try {
                return getHostName(url) == getHostName(_url)
            } catch {
                return false
            }
        })
    }
}