import '@babel/polyfill'
import { firestore } from '../../../firebase'
import { createUrl, getUrl } from '../api/urlApi'
import {
  mockCreateNewUrl,
  mockGetUrlFail,
  mockGetUrlSuccess,
  mockReturnExistingUrl,
  testId,
  testOriginalUrl,
  testShortUrl,
} from '../mocks/mockTestResults'

jest.mock('../../../firebase', () => ({
  firestore: {
    collection: jest.fn(),
  },
}))

describe('Url Api test', () => {
  describe('createUrl', () => {
    it('when creating new url, return existing url if it already exists in db', async () => {
      // Function mocks
      const mockParam = testOriginalUrl
      const mockResult = {
        originalUrl: testOriginalUrl,
        shortUrl: testShortUrl,
        id: testId,
      }

      // Firebase mocks
      firestore.collection.mockImplementationOnce(mockReturnExistingUrl)
      const result = await createUrl(mockParam)

      // Assertion
      expect(result).toEqual(mockResult)
    })

    it('when creating new url, create and return new url if it does not exists in db', async () => {
      // Function mocks
      const mockParam = testOriginalUrl
      const mockResult = {
        originalUrl: testOriginalUrl,
        shortUrl: testShortUrl,
        id: testId,
      }

      // Firebase mocks
      firestore.collection.mockImplementationOnce(mockCreateNewUrl)
      const result = await createUrl(mockParam)

      // Assertion
      expect(result).toEqual(mockResult)
    })

    it('when creating new url, return error if param is not string', async () => {
      // Assertion
      await expect(createUrl(123)).rejects.toThrow('Invalid Param')
      await expect(createUrl(true)).rejects.toThrow('Invalid Param')
      await expect(createUrl(null)).rejects.toThrow('Invalid Param')
      await expect(createUrl(['test', 'test'])).rejects.toThrow('Invalid Param')
      await expect(createUrl({ test: 'test' })).rejects.toThrow('Invalid Param')
    })
  })

  describe('getUrl', () => {
    it('when getting an url, return url if it exists in db', async () => {
      // Function mocks
      const mockParam = testOriginalUrl
      const mockResult = {
        originalUrl: testOriginalUrl,
        shortUrl: testShortUrl,
        id: testId,
      }

      // Firebase mocks
      firestore.collection.mockImplementationOnce(mockGetUrlSuccess)
      const result = await getUrl(mockParam)

      // Assertion
      expect(result).toEqual(mockResult)
    })

    it('when getting an url, return error if it does not exists in db', async () => {
      // Function mocks
      const mockParam = testOriginalUrl

      // Firebase mocks
      firestore.collection.mockImplementationOnce(mockGetUrlFail)

      // Assertion
      await expect(getUrl(mockParam)).rejects.toThrow('No such document')
    })

    it('when getting an url, return error if param is not string', async () => {
      // Assertion
      await expect(getUrl(123)).rejects.toThrow('Invalid Param')
      await expect(getUrl(true)).rejects.toThrow('Invalid Param')
      await expect(getUrl(null)).rejects.toThrow('Invalid Param')
      await expect(getUrl(['test', 'test'])).rejects.toThrow('Invalid Param')
      await expect(getUrl({ test: 'test' })).rejects.toThrow('Invalid Param')
    })
  })
})
