const btnAddUrl = document.getElementById('add-url') as HTMLButtonElement
const btnRemoveUrl = document.getElementById('remove-url') as HTMLButtonElement

btnAddUrl.addEventListener('click', () => browser.runtime.sendMessage(true))
btnRemoveUrl.addEventListener('click', () => browser.runtime.sendMessage(false))
