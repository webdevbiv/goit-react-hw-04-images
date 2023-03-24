import { useEffect } from 'react'
import PropTypes from 'prop-types'

export const Modal = ({ picture, alt, closeModal }) => {
    useEffect(() => {
        window.addEventListener('keydown', handlePressESC)
        return () => {
            window.removeEventListener('keydown', handlePressESC)
        }
    })

    const handlePressESC = (e) => {
        if (e.code === 'Escape') {
            closeModal()
        }
    }

    const closeModalBackDrop = (e) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <div
            className={'Overlay'}
            onClick={closeModalBackDrop}
        >
            <div
                className={'Modal'}
            >
                <img
                    src={picture}
                    alt={alt}
                />
            </div>
        </div>
    )
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    picture: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}



