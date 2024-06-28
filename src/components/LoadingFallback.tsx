import React from 'react'
import ReactDom from 'react-dom'
import { ThreeDots } from "react-loader-spinner";

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
} as React.CSSProperties

const LOADER_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '50px',
  zIndex: 1000
} as React.CSSProperties

const LoadingFallback: React.FC = () => {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={LOADER_STYLES}>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    </>,
    document.getElementById('loader')!
  )
}

export default LoadingFallback;
