import React, { useState } from 'react'
import { UrlModel } from '../../modules/Url/model/urlModel'
import { createUrl } from '../../modules/Url/api/urlApi'
import TextInput from '../../components/TextInput/TextInput'

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>()
  const [currentUrl, setCurrentUrl] = useState<UrlModel>()

  const createUrlClick = async (url: string) => {
    if (url) {
      const nextCurrentUrl = await createUrl(url)
      if (nextCurrentUrl) setCurrentUrl(nextCurrentUrl as UrlModel)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextInputValue = event.target.value
    setInputValue(nextInputValue)
  }

  return (
    <div className="App">
      <header className="App-header">
        <TextInput name="url" value={inputValue} onChange={handleInputChange} />
        <button onClick={() => createUrlClick(inputValue as string)}>
          Create new url
        </button>
        {Boolean(currentUrl) && (
          <a
            href={currentUrl?.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentUrl?.shortUrl}
          </a>
        )}
      </header>
    </div>
  )
}

export default Home
