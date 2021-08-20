/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { getUrl } from '../../modules/Url/api/urlApi'
import { UrlModel } from '../../modules/Url/model/urlModel'

const Url: React.FC = (props) => {
  const search = useLocation().search
  const id = new URLSearchParams(
    search as unknown as Record<string, string>
  ).get('id')

  const [isLoading, setIsLoading] = useState(false)
  const [url, setUrl] = useState<UrlModel>()

  useEffect(() => {
    const fetchData = async (id: string) => {
      const nextUrl = await getUrl(id)
      setUrl(nextUrl)
      setIsLoading(false)
    }

    if (id) {
      setIsLoading(true)
      fetchData(id)
    }
  }, [])

  if (isLoading) return <Loading />
  if (url) window.location.href = url.originalUrl

  return <div>No such url</div>
}

export default Url
