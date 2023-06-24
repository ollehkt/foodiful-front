export const tryCatch = async (cb: any, errorCb?: any) => {
  try {
    return cb()
  } catch (error) {
    if (errorCb) errorCb(error)
  }
}
