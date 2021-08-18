import { firestore } from '../../../firebase'
import { urlFireStoreTypeConverter, UrlModel } from '../model/urlModel'

export const getUrls = async (): Promise<UrlModel[] | null> => {
  try {
    const response = await firestore
      .collection('urls')
      .withConverter(urlFireStoreTypeConverter)
      .get()
    return response.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      }
    })
  } catch (err) {
    throw new Error(`Error at getUrls: ${err}`)
  }
}

export const getUrl = async (id: string): Promise<UrlModel | undefined> => {
  try {
    // Param validations
    if (typeof id !== 'string') throw new Error('Invalid Param')

    // Firestore functions
    const urlRef = firestore.collection('urls').doc(id)
    const urlDoc = await urlRef.withConverter(urlFireStoreTypeConverter).get()

    // Result validations
    if (!urlDoc.exists) {
      throw new Error('No such document')
    }
    return urlDoc.data()
  } catch (err) {
    throw new Error(`Error at createUrl: ${err}`)
  }
}

export const createUrl = async (url: string): Promise<UrlModel | null> => {
  try {
    // Param validations
    if (typeof url !== 'string') throw new Error('Invalid Param')

    // Firestore functions
    const urlRef = firestore.collection('urls')
    const snapshot = await urlRef
      .withConverter(urlFireStoreTypeConverter)
      .where('originalUrl', '==', url)
      .get()

    // Result validations
    if (snapshot.empty) {
      const newUrlRef = urlRef.doc()
      const values = {
        originalUrl: url,
        shortUrl: `http://localhost:3000/url?=${newUrlRef.id}`,
      }
      await newUrlRef.set(values)
      return { ...values, id: newUrlRef.id }
    }
    let existingData: UrlModel = { originalUrl: '', shortUrl: '', id: '' }
    snapshot.forEach((doc) => {
      existingData = { ...doc.data(), id: doc.id }
    })
    return existingData
  } catch (err) {
    throw new Error(`Error at createUrl: ${err}`)
  }
}
