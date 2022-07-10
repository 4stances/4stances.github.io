export default function Menu({ tricks, skaters, filmers, locations }) {

    return (
        <div id="navigation">
            <div className="page-block">
                <a href="#tricks">
                    <span className="navigation-text">Tricks</span>
                </a>
                <a href="#skaters">
                    <span className="navigation-text">Skaters</span>
                </a>
                <a href="#home">
                    <img src="/logo.png" alt="4 Stances Logo" width="60" />
                </a>
                <a href="#filmers">
                    <span className="navigation-text">Filmers</span>
                </a>
                <a href="#locations">
                    <span className="navigation-text">Locations</span>
                </a>
            </div>
            <div className="page-block">
                <MenuList items={ tricks } keyword="trick" displayNameFunc={ (i) => i.name } />
                <MenuList items={ skaters } keyword="skater" displayNameFunc={ (i) => i.name } />
                <MenuList items={ filmers } keyword="filmer" displayNameFunc={ (i) => i.name } />
                <MenuList items={ locations } keyword="location" displayNameFunc={ (i) => i.name } />
            </div>
        </div>      
    )
}

function MenuList({ items, keyword, displayNameFunc }) {
    return (
        <ul>
        { items.map(item => {
            const href = "#?" + keyword + "=" + item.id
            return <li><a href={ href }>{ displayNameFunc(item) }</a></li>
        }) }
        </ul>
    )
}
