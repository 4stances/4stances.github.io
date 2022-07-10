import ClipView from "./ClipView";

export default function Feed({ clips }) {
    return (
        <div className="page-block">
            <ClipList clips={ clips } />
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