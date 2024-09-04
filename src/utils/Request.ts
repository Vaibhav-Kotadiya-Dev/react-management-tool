const toRequestParams = (obj: any) => {
  return Object.keys(obj)
    .filter(key => obj[key] && obj[key].toString().trim() !== '')
    .map(key => `${key}=${obj[key].toString()}`)
    .join('&')
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { toRequestParams }
