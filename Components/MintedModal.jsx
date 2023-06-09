import React from 'react'
import Image from 'next/image'
import GrapeGrannyIcon from '../public/images/GrapeGrannyIcon.png'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import OpenseaIcon from '../public/images/opensea_icon.svg' // Import Opensea Icon
import RaribleIcon from '../public/images/rarible_icon.svg' // Import Rarible Icon

function MintedModal({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          background: 'linear-gradient(to right, #020617, #581C87)',
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          fontFamily: 'Coiny, sans-serif' // Apply coiny font to all child elements
        }
      }}
    >
      <IconButton
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: '#fff' // Make the close button white
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle
        style={{
          textAlign: 'center',
          color: '#fff',
          paddingTop: '40px', // Push the title down to give room for the close button
          fontFamily: 'Coiny, sans-serif' 
        }}
      >
        {'Congratulations on your minted GrapeGranny NFT!'}
      </DialogTitle>
      <DialogContent
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '20px',
          color: '#fff',
          justifyContent: 'space-around',
          fontFamily: 'Coiny, sans-serif'
        }}
      >
        <Image
          src={GrapeGrannyIcon}
          alt="GrapeGranny"
          width={250}
          height={250}
        />
        <div>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            View your NFTs on:
          </Typography>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <Link
              href="https://testnets.opensea.io/account"
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              passHref
            >
              <Image src={OpenseaIcon} alt="Opensea" width={20} height={20} />
              OpenSea
            </Link>
            <Link
              href="https://testnet.rarible.com/items/owned"
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              passHref
            >
              <Image src={RaribleIcon} alt="Rarible" width={20} height={20} />
              Rarible
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MintedModal
