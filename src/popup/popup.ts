const btnAddUrl = document.getElementById('add-url') as HTMLButtonElement
const btnRemoveUrl = document.getElementById('remove-url') as HTMLButtonElement

const addUrl = () => browser.runtime.sendMessage({ addUrl: true } as IMsg)
const removeUrl = () => browser.runtime.sendMessage({ addUrl: false } as IMsg)

btnAddUrl.addEventListener('click', addUrl)
btnRemoveUrl.addEventListener('click', removeUrl)
