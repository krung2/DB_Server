export const returnLib = (status: number, message: string, data?: object | string) => {
  return {
    status,
    message,
    data
  }
}