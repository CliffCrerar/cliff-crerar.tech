import React, { useState, useEffect } from 'react';
import VideoBackground from '../../components/navbar/landing-background';
import ReactPlayer from 'react-player';

function PageOne() {
    const [state, setState] = useState(0)
    let videoHeight;
    useEffect(() => {
        console.log('document: ', document);
        return () => {

        }
    })
    return <main>

        <div style={{ position: 'absolute', zIndex: '0', top: '-10vh', left: '0', bottom: '0', right: '0', maxHeight: '100%', maxWidth: '100%' }}>
            {/* <VideoBackground/> */}
            <ReactPlayer url='https://www.youtube.com/embed/0pXYp72dwl0'
                playIcon={false}
                muted
                loop
                width="120vw"
                height="120vh"
                
                config={{
                youtube: { playerVars: { rel:0,showinfo: 0, modestbranding: 1, autoplay: 1, controls: 0, muted: 1 } }
            }}
            />
        </div>
        <div style={{
            position: 'fixed',
            zIndex: 1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }}></div>
    </main>
}

export default PageOne;