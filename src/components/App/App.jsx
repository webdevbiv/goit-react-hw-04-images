import { useState, useEffect } from 'react'

import {
  Button,
  ImageGallery,
  Loader,
  Modal,
  Searchbar,
  getPictures,
} from 'components'

export const App = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [showLoadMore, setShowLoadMore] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalPictureURL, setModalPictureURL] = useState('')
  const [modalPictureALT, setModalPictureALT] = useState('')
  const [loader, setLoader] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    search && setLoader(true)
    search && getPictures(search, page)
      .then(searchResults => {
        const hits = searchResults.hits
        const total = searchResults.total
        showLoadMoreTogle(hits.length, total, page)
        setSearchResults(prev => {
          return [...prev, ...hits]
        })
      })
      .catch(err => {
        setError(err)
      })
      .finally(setLoader(false))
  }, [page, search])

  const showLoadMoreTogle = (length, total, page) => {
    const totalPages = Math.floor(total / 12)
    if (length % 12 === 0 && length !== 0 && page <= totalPages) {
      return setShowLoadMore(true)
    }
    return setShowLoadMore(false)
  }

  const onSubmit = (data) => {
    setSearch((data.search).trim().toLowerCase())
    setPage(1)
    setSearchResults([])
  }

  const onLoadMore = () => {
    setPage(prev => prev + 1)
  }

  const modalOpen = ({ largeImageURL, tags }) => {
    setModalPictureURL(largeImageURL)
    setModalPictureALT(tags)
    setShowModal(true)
  }

  const modalClose = () => {
    setShowModal(false)
  }

  return (
    <div className={`App `}>
      {error && (<div>{error}</div>)}
      <Searchbar onSubmit={onSubmit} />
      <div className={`Container `}>
        <ImageGallery
          searchResults={searchResults}
          modalOpen={modalOpen}
        />
        {showLoadMore &&
          <Button onClick={onLoadMore} />
        }
      </div>
      {loader && (
        <Loader />
      )}
      {showModal && (
        <Modal
          closeModal={modalClose}
          picture={modalPictureURL}
          alt={modalPictureALT}
        />
      )}
    </div>
  )
}
