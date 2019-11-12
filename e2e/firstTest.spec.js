// See https://stackoverflow.com/questions/54816994/is-it-actually-possible-to-make-detox-jest-tests-pass-with-a-react-native-app-ru/54834078
const { reloadApp } = require('detox-expo-helpers')

describe('Example', () => {
  beforeEach(async () => {
    //await device.reloadReactNative()
    await device.reloadApp()
  })

  it('should have login screen', async () => {
    await expect(element(by.text('Login'))).toBeVisible()
  })

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible()
  })

  it('should show hello screen after tap', async () => {
    await element(by.id('hello_button')).tap()
    await expect(element(by.text('Hello!!!'))).toBeVisible()
  })

  it('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap()
    await expect(element(by.text('World!!!'))).toBeVisible()
  })
})
