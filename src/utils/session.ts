
const getValue = (key: string) => {
  const value = localStorage.getItem(key)
  return value
}

const setValue = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

const clearItem = (key: string) => {
  localStorage.removeItem(key)
}

const session = {
  getValue,
  setValue,
  clearItem
}

export default session