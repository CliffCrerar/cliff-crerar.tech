import { width } from "@mui/system";
import React, {useRef,useEffect,useState} from "react"
let setState = false;
var player;

 export const IndexBackground = () => {
    const divRef = useRef<HTMLDivElement>();
    const [clientDimensions, setClientDimensions] = useState({height: 0, width: 0})
    
    
    useEffect(()=>{
        console.log('divRef: ', divRef);
        if(!setState) {
            setState = true;
            setClientDimensions({
                height: divRef.current.clientHeight,
                width: divRef.current.clientWidth
            })
        }

        // divRef.current.children[0].addEventListener('loa')
        function onYouTubePlayerAPIReady() {
          player = new YT.Player('ytPlayer', {
            height: '360',
            width: '640',
            videoId: 'fPYU2BA_11c'
          });
          
        }
      
    })

    return(
    <div ref={divRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        minWidth: '100vw',
        minHeight: '100vh',
        zIndex: -1
        }}>
        <div id="ytPlayer"/>
    {/* <iframe 
        height={clientDimensions.height} 
        width={clientDimensions.width} 
        src="https://www.youtube-nocookie.com/embed/fPYU2BA_11c?controls=0&autoplay=1" 
        // eslint-disable-next-line react/no-unknown-property
        frameBorder="0" 
        
        // eslint-disable-next-line react/no-unknown-property
        ></iframe> */}
        </div>
)}