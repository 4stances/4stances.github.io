import { useState } from "react"

export default function ClipView({ clip }) {

    const alt = clip.name + " by " + clip.skater_name + ", filmed by " + clip.filmer_name
    const clipsPath = process.env.PUBLIC_URL + "/clips/"
    const poster = clipsPath + clip.id + "/poster.jpg"
    const video = clipsPath + clip.id + "/video.mp4"

    return (
        <div className="clip">
            <ClipCanvas poster={ poster } video={ video } alt={ alt } />
            <ClipCaption clip={ clip } />
        </div>
    )
}

function ClipCanvas({ poster, video, alt }) {
    const [isVideoShown, setIsVideoShown] = useState(false)

    function showVideo() {
        setIsVideoShown(true)
    }
    
    if (isVideoShown) {
        return (
            <ClipVideo src={ video } />
        )
    } else {
        return (
            <ClipPoster src={ poster } alt={ alt } onClick={ showVideo } />  
        )    
    }
}

function ClipCaption({ clip }) {
    return (
        <div className="clip-caption">
            <span className="clip-trick">{ clip.name }</span>
            <span className="clip-skater">{ clip.skater_name } ({ clip.skater_instagram })</span>
            <span className="clip-filmer">{ clip.filmer_name } ({ clip.filmer_instagram })</span>
            <span className="clip-location">{ clip.location }</span>
        </div>
    )
}

function ClipPoster({ src, alt, onClick }) {
    return (
        <div className="clip-poster">
            <img src={ src } alt={ alt } onClick={ onClick }/>
        </div>
    )
}

function ClipVideo({ src }) {
    return (
        <div className="clip-video">
            <video controls autoPlay>
                <source src={ src } />
            </video>
        </div>
    )
}