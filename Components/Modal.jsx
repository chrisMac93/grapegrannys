import React from 'react'
import ReactModal from 'react-modal'
import { css } from '@emotion/react'
import { RingLoader } from 'react-spinners'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

function Modal({ isOpen, message, isTransactionPending, onRequestClose }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose} // Allow closing the modal by clicking outside or pressing ESC
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)' // This will make the overlay darker
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#2f3542',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          color: '#fff'
        }
      }}
    >
      <RingLoader
        color={'#fff'}
        loading={isTransactionPending}
        css={override}
        size={50}
      />
      <h2>{message}</h2>
      {!isTransactionPending && <button onClick={onRequestClose} style={{ textAlign: 'center', color: '#A855F7' }}>Close</button>}
    </ReactModal>
  )
}

export default Modal
