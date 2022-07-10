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
  )
  const [skaters] = useState(
    peopleJSON.filter(person => clipsJSON.filter(clip => clip.skater === person.id)[0])
  )
  const [filmers] = useState(
    peopleJSON.filter(person => clipsJSON.filter(clip => clip.filmer === person.id)[0])
  )
  const [locations] = useState(
    locationsJSON.filter(location => clipsJSON.filter(clip => clip.location === location.id)[0])
  )

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
  return (
    <>
      <Menu tricks={ tricks } skaters={ skaters } filmers={ filmers } locations={ locations } />
      {/* <Feed clips={ clips } /> */}
      <PageFooter />
    </>
  )
}

export default App;