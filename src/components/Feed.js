import ClipView from "./ClipView";

export default function Feed({ clips, filter }) {
    let filteredClips = clips;
    const params = new URLSearchParams(window.location.search);
    
    if (filter != null) {
        filteredClips = filteredClips.filter(clip => clip[filter.key].id === filter.value);
    }

    return (
        <div className="page-block">
            <ClipList clips={ filteredClips } />
        </div>
    )
}

function ClipList({ clips }) {
    return (
        clips.map(clip => {
            return <ClipView key={ clip.id } clip={ clip } />
        })
    )
}