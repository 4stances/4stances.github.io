import { useState } from "react";
import Menu from "./components/Menu";
import Feed from "./components/Feed";
import PageFooter from "./components/PageFooter";
import clipsJSON from './data/clips.json';
import peopleJSON from './data/people.json';
import locationsJSON from './data/locations.json';
import tricksJSON from './data/tricks.json';

function App() {
  const [tricks] = useState(
    tricksJSON.filter(trick => clipsJSON.filter(clip => clip.trick === trick.id)[0])
    .sort((a, b) => a.name > b.name ? 1 : -1)
  )
  const [skaters] = useState(
    peopleJSON
      .filter(person => clipsJSON.filter(clip => clip.skater === person.id).length > 0)
      .sort((a, b) => a.name > b.name ? 1 : -1)
  )
  const [filmers] = useState(
    peopleJSON
      .filter(person => clipsJSON.filter(clip => clip.filmer === person.id).length > 0)
      .sort((a, b) => a.name > b.name ? 1 : -1)
  )
  const [locations] = useState(
    locationsJSON.filter(location => clipsJSON.filter(clip => clip.location === location.id)[0])
    .sort((a, b) => a.name > b.name ? 1 : -1)
  );
  const [clips] = useState(
    clipsJSON
      .sort((a, b) => { return a.id < b.id ? 1 : -1 })
      .map(clip => {
        return {
          id: clip.id,
          trick: tricksJSON.filter(trick => trick.id === clip.trick)[0],
          skater: peopleJSON.filter(person => person.id === clip.skater)[0],
          filmer: peopleJSON.filter(person => person.id === clip.filmer)[0],
          location: locationsJSON.filter(location => location.id === clip.location)[0]
        }
      })
  )
  const [filter, setFilter] = useState(null);

  function applyFilter(key, value) {
    setFilter({
      key: key, 
      value: value
    });
  }

  let filterObject = null;
  if (filter != null) {
    switch (filter.key) {
      case 'trick':
        filterObject = tricks.filter(obj => obj.id === filter.value)[0];
        break;
      case 'skater':
        filterObject = skaters.filter(obj => obj.id === filter.value)[0];
        break;
      case 'filmer':
        filterObject = filmers.filter(obj => obj.id === filter.value)[0];
        break;
      case 'location':
        filterObject = locations.filter(obj => obj.id === filter.value)[0];
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Menu tricks={ tricks } skaters={ skaters } filmers={ filmers } locations={ locations } filterObject={ filterObject } applyFilter={ applyFilter } />
      <Feed clips={ clips } filter={ filter } />
      <PageFooter />
    </>
  )
}

export default App;