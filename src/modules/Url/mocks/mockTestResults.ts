export const testOriginalUrl = 'https://www.reuters.com/article/urnidgns002570f3005978d8002576f60035a6bb-idUS98192761820100330'
export const testShortUrl = 'http://localhost:3000/url?id=omRH8RUw83OEYtLtro8v'
export const testId = 'omRH8RUw83OEYtLtro8v'

export const mockReturnExistingUrl = () => ({
  withConverter: () => ({
    where: () => ({
      get: () => ({
        empty: false,
        forEach: (mockCallback: any) => {
          mockCallback({
            data: () => ({
              originalUrl: testOriginalUrl,
              shortUrl: testShortUrl,
            }),
            id: testId,
          })
        },
      }),
    }),
  }),
})

export const mockCreateNewUrl = () => ({
  withConverter: () => ({
    where: () => ({
      get: () => ({
        empty: true,
      }),
    }),
  }),
  doc: () => ({
    id: testId,
    set: () => null,
  }),
})

export const mockGetUrlSuccess = () => ({
  doc: () => ({
    withConverter: () => ({
      get: () => ({
        exists: true,
        data: () => ({
          originalUrl: testOriginalUrl,
          shortUrl: testShortUrl,
          id: testId,
        }),
      }),
    }),
  }),
})

export const mockGetUrlFail = () => ({
  doc: () => ({
    withConverter: () => ({
      get: () => ({
        exists: false,
      }),
    }),
  }),
})
