import { useState } from "react"

export default function Menu({ clips, tricks, skaters, filmers, locations, filter, applyFilter }) {
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

    let selectedFilter = null;
    if (filter != null) {
        switch (filter.key) {
        case 'trick':
            selectedFilter = selectedFilterObject(clips, tricks, filter.key);
            break;
        case 'skater':
            selectedFilter = selectedFilterObject(clips, skaters, filter.key, null, "instagram");
            break;
        case 'filmer':
            selectedFilter = selectedFilterObject(clips, filmers, filter.key, "Filmed by", "instagram");
            break;
        case 'location':
            selectedFilter = selectedFilterObject(clips, locations, filter.key);
            break;
        default:
            break;
        }
    } else {
        selectedFilter = {
            title: "4 Stances",
            count: clips.length
        };
    }

    function selectedFilterObject(clips, target, keyword, prefix, fallback) {
        const object = target.filter(obj => obj.id === filter.value)[0];
        let title = "";
        if (prefix != null) {
          title += prefix + " ";
        }
        title += object.name ??= ("@" + object[fallback]);
        const count = clips.filter(clip => clip[keyword].id === filter.value).length;
        return {
            title: title,
            count: count
        }
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
                <MenuList items={ locations } keyword="location" displayNameFunc={ (i) => locationName(i.name) } isVisible={ menu['locations'] } applyFilter={ handleApplyFilter } />
            </div>
            <SelectedFilter selectedFilter={ selectedFilter } />
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
    let name = person.name
    return name ??= "@" + person.instagram
}

function locationName(location) {
    return location.replace(", ", "\n")
}

function SelectedFilter({ selectedFilter }) {
    if (selectedFilter != null) {
        const clipsTitle = selectedFilter.count === 1 ? "clip" : "clips";
        const countText = selectedFilter.count + " " + clipsTitle;
        return (
            <div id="active-filter">
                <span className="title">{ selectedFilter.title }</span>
                <span className="subtitle">{ countText }</span>
            </div>
        )
    } else {
        return <></>
    }
}