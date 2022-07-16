export default function Name({ subject, keyword, path, appendix = "", applyFilter }) {

    function handleClick() {
        applyFilter(keyword, subject.id);
    }

    const url = "/" + path + "/" + subject.id + "/" + appendix;
    if (subject.name != null) {
        return (
            <a href="#" onClick={ handleClick }>{ subject.name }</a>
        )
    } else {
        return (<></>);
    }
}

export function Instagram({ handle }) {
    const url = "https://www.instagram.com/" + handle + "/"
    if (handle != null) {
        return (
            <a href={ url }>@{ handle }</a>
        )
    } else {
        return <></>
    }
}
