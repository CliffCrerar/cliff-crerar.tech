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

        <div style={{ 
            position: 'absolute', 
            zIndex: '0', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%,-50%)' }}>
            {/* <VideoBackground/> */}
            <ReactPlayer url='https://www.youtube.com/embed/0pXYp72dwl0'
                playIcon={false}
                muted
                loop
                width="110vw"
                height="110vh"
                config={{
                    youtube: { playerVars: { rel: 0, showinfo: 0, modestbranding: 1, autoplay: 1, controls: 0, muted: 1 } }
                }}
            />
        </div>
        <div style={{
            position: 'fixed',
            zIndex: 1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            
        }}></div>
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%', 
            transform: 'translate(-50%,-50%)', 
            zIndex: 10, 
            color: 'white',
            opacity: '0.5'
        }} className="main-text w-75">
            <div style={{fontFamily:'Revalia', fontSize: '5em'}} className="w-100">Software Engineer</div>
            <div className="d-flex flex-row align-items-center">
                <div style={{ 
                    flex: '1', 
                    height: '2px', 
                    background: 'white' }} className="pr-1" ></div>
                <div style={{ 
                    height: '10px', 
                    width: '10px', 
                    borderRadius: '50%', 
                    background: 'white', 
                    margin: '10px' }}></div>
                <div style={{ 
                    flex: '1', 
                    height: '2px', 
                    background: 'white' }} className="pl-1" ></div>
            </div>
        </div>
    </main>
}

export default PageOne;