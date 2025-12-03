import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MXR @MAIN | Holiday Party by 434 Media'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img 
          src="https://digitalcanvas.community/events/mxratmain/opengraph-image.tmp"
          alt="MXR @MAIN"
          width={1200}
          height={630}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
