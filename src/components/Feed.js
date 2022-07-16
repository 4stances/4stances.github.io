import ClipView from "./ClipView";

export default function Feed({ clips, filter, applyFilter }) {
    let filteredClips = clips;
    
    if (filter != null) {
        filteredClips = filteredClips.filter(clip => clip[filter.key].id === filter.value);
    }

    return (
        <div className="page-block">
            <ClipList clips={ filteredClips } applyFilter={ applyFilter }  />
        </div>
    )
}

function ClipList({ clips, applyFilter }) {
    return (
        clips.map(clip => {
            return <ClipView key={ clip.id } clip={ clip } applyFilter={ applyFilter }  />
        })
    )
}