import { useState } from "react"
import Name from "./Name";

export default function ClipView({ clip, applyFilter }) {

    const alt = clip.name + " by " + clip.skater.name + ", filmed by " + clip.filmer.name
    const clipsPath = process.env.PUBLIC_URL + "/clips/"
    const poster = clipsPath + clip.id + "/poster.jpg"
    const video = clipsPath + clip.id + "/video.mp4"

    return (
        <div className="clip">
            <ClipCanvas poster={ poster } video={ video } alt={ alt } />
            <ClipCaption clip={ clip } applyFilter={ applyFilter }  />
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

function ClipCaption({ clip, applyFilter }) {
    return (
        <div className="clip-caption">
            <span className="clip-trick"><Name subject={ clip.trick } keyword="trick" path="tricks" applyFilter={ applyFilter } /></span>
            <span className="clip-skater">by <Name subject={ clip.skater } keyword="skater" path="users" appendix="clips" applyFilter={ applyFilter } /></span>
            <span className="clip-filmer">filmed by <Name subject={ clip.filmer } keyword="filmer" path="users" appendix="filmed" applyFilter={ applyFilter } /></span>
            <span className="clip-location">at <Name subject={ clip.location } keyword="location" path="locations" applyFilter={ applyFilter } /></span>
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