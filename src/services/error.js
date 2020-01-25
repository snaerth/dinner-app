import isBrowser from '../utils/isBrowser'

/**
 * Global error handler function
 * @param {Object} error Error object
 */
export default function errorHandler(error) {
  const browser = isBrowser();

  if(browser) {
    if(error instanceof Error) {
      window.bugsnagClient.notify(error)
    } else {
      window.bugsnagClient.notify(new Error(error))
    }
  }

  if(browser){
    console.error(error);
  }

  return error;
}