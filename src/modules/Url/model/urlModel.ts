import firebase from 'firebase'

export type UrlModel = {
  originalUrl: string
  shortUrl: string
  id: string
}

export const urlFireStoreTypeConverter = {
  toFirestore(url: UrlModel): firebase.firestore.DocumentData {
    return url
  },

  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): UrlModel {
    const data = snapshot.data(options)!
    return {
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
      id: data.id,
    }
  },
}
