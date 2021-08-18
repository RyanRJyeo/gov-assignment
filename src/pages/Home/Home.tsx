import React, { useEffect, useState } from 'react'
import { UrlModel } from '../../modules/Url/model/urlModel'
import { createUrl, getUrl, getUrls } from '../../modules/Url/api/urlApi'

const Home: React.FC = () => {
  const [urls, setUrls] = useState<UrlModel[] | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const nextUrls = await getUrls()
      setUrls(nextUrls)
    }

    fetchData()
  }, [])

  const createUrlClick = async () => {
    const newData = await createUrl('someOriginalUrl')
  }

  const getUrlClick = async () => {
    const newData = await getUrl('asdasd')
  }

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={createUrlClick}>Create new url</button>
        <button onClick={getUrlClick}>Get url</button>
      </header>
    </div>
  )
}

export default Home
