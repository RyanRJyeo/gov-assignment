export const testOriginalUrl = 'someOriginalUrl'
export const testShortUrl = 'http://localhost:3000/url?=omRH8RUw83OEYtLtro8v'
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
