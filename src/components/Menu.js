import { useState } from "react"

export default function Menu({ tricks, skaters, filmers, locations, filterObject, applyFilter }) {
    let [menu, setMenu] = useState(makeState());

    function toggleMenu(key) {
        let newState = makeState();
        newState[key] = !menu[key];
        setMenu(newState);
    }

    function makeState() {
        return {
            tricks: false,
            skaters: false,
            filmers: false,
            locations: false
        }
    }

    function toggleTricks() {
        toggleMenu('tricks');
    }

    function toggleSkaters() {
        toggleMenu('skaters');
    }

    function toggleFilmers() {
        toggleMenu('filmers');
    }

    function toggleLocations() {
        toggleMenu('locations');
    }

    function handleApplyFilter(key, value) {
        applyFilter(key, value);
        setMenu(makeState());
    }

    return (
        <div id="navigation">
            <div className="page-block menu">
                <a href="#tricks" onClick={ toggleTricks }>
                    Tricks
                </a>
                <a href="#skaters" onClick={ toggleSkaters }>
                    Skaters
                </a>
                <a href="#home">
                    <img src="/logo.png" alt="4 Stances Logo" width="60" />
                </a>
                <a href="#filmers" onClick={ toggleFilmers }>
                    Filmers
                </a>
                <a href="#locations" onClick={ toggleLocations }>
                    Locations
                </a>
            </div>
            <div className="page-block submenu">
                <MenuList items={ tricks } keyword="trick" displayNameFunc={ (i) => i.name } isVisible={ menu['tricks'] } applyFilter={ handleApplyFilter } />
                <MenuList items={ skaters } keyword="skater" displayNameFunc={ (i) => personName(i) } isVisible={ menu['skaters'] } applyFilter={ handleApplyFilter } />
                <MenuList items={ filmers } keyword="filmer" displayNameFunc={ (i) => personName(i) } isVisible={ menu['filmers'] } applyFilter={ handleApplyFilter } />
                <MenuList items={ locations } keyword="location" displayNameFunc={ (i) => i.name } isVisible={ menu['locations'] } applyFilter={ handleApplyFilter } />
            </div>
            <SelectedFilter filterObject={ filterObject } />
        </div>      
    )
}

function MenuList({ items, keyword, displayNameFunc, isVisible, applyFilter }) {
    return isVisible ? (
        <ul className="submenu-list">
        { items.map(item => {
            return <MenuListItem key={item.id} item={ item } keyword={ keyword } displayNameFunc={ displayNameFunc } applyFilter={ applyFilter } />
        }) }
        </ul>
    ) : (<></>)
}

function MenuListItem({ item, keyword, displayNameFunc, applyFilter }) {
    
    function handleApplyFilter() {
        applyFilter(keyword, item.id)
    }

    return (
        <li><a href='#' onClick={ handleApplyFilter }>{ displayNameFunc(item) }</a></li>
    )
}


function personName(person) {
    return person.name ??= "@" + person.instagram
}

function SelectedFilter({ filterObject }) {
    if (filterObject != null) {
        return (
            <div id="active-filter">{ filterObject.name }</div>
        )
    } else {
        return <></>
    }
}