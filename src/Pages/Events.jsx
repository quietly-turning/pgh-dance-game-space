import { useState } from 'react'
import Modal from "../_layout/Modal"

function EventsPage(){

  const [modalVisible, setModalVisible] = useState(false)
  const [imgIndex, setImgIndex]         = useState(0)
  const [imgGroupName, setImgGroupName] = useState("")
  const [filenames,    setFilenames]    = useState([])

  const modalProps = {
    activeImgGroup: imgGroupName,
    imgIndex: imgIndex,
    setImgIndex: setImgIndex,
    thumbs: filenames,
    isVisible: modalVisible,
    onModalHide: () => hideModal()
  }

  const upcomingEvents = [
    {
      name: "Stamina Con 2",
      date: "Oct 31 – Nov 2, 2025",
      desc: [`Stamina Con returns this fall!   Check the
        <a href="https://staminanation.com/">Stamina Nation Discord server</a>
        for more details.`],
      logo: 'Stamina-Con-2-logo.png'
    },
    {
      name: "L.E.F.T.S.",
      date: "Jan 17 – Jan 18, 2026",
      desc: [`LEFTS is a casual, inclusive event that maximizes everyone's
        participation regardless of skill level.   Check the
        <a href="https://staminanation.com/">event website</a>
        for more details.`],
      logo: 'lefts-logo.jpg'
    },
  ]

  const pastEvents = [
    {
      name: "Girlpocalypse 2025 Retreat",
      date: "June 28–29, 2025",
      desc: [`The retreat was an in-person gathering that brought together competitors
            and friends of those who participated in
            <a href="https://www.girlpocalypse.dance/">Girlpocalypse</a> —
            a remote ITG & SMX tournament designed to celebrate and promote competition
            among women and nonbinary dance game players.`],
      thumbs: [
        "2025gp1.jpg", "2025gp2.jpg"
      ]
    },
    {
      name: "Stamina Jawn",
      date: "May 30 – June 1, 2025",
      desc: ["Stamina Nation returned with its first in-person event in over 5 years!"],
      thumbs: [
        "sj1.jpg", "sj2.jpg", "sj3.jpg", "sj4.jpg", "sj5.jpg", "sj6.jpg", "sj7.jpg", "sj8.jpg", "sj9.jpg"
      ]
    },
    {
      name: "Trans Rights SuperNOVA",
      date: "May 17, 2025",
      desc: [`LFK ran a local SuperNOVA 2 tournament to raise money for
            <a href="https://translifeline.org/">Trans Lifeline</a>.`,
            `All competitors were required to play with "Right" turn mod enabled.
            Most competitors chose to play with "Fish" noteskin.`],
      thumbs: [
        "trsn1.jpg", "trsn2.jpg", "trsn3.jpg", "trsn4.jpg", "trsn5.jpg",
      ]
    },
    {
      name: "We Have DDR At Home",
      date: "December 7, 2024",
      desc: ["Bogo ran a fun local DDR tournament using DDR console games."],
      thumbs: [
        "whdah1.jpg", "whdah2.png"
      ]
    },
    {
      name: "DDRbeque 2024",
      date: "July 4, 2024",
      desc: ["We gathered in Pittsburgh's Schenley Park on the 4th of July for food, friends, and dance games."],
      thumbs: [
        "ddrbeque1.jpg", "ddrbeque2.jpg", "ddrbeque3.jpg", "ddrbeque4.jpg", "ddrbeque5.jpg", "ddrbeque6.jpg"
      ]
    },
  ]

  function showModal(hyphenatedName, i, thumbs){
    setImgGroupName(hyphenatedName)
    setImgIndex(i)
    setFilenames(thumbs)
    setModalVisible(true)
  }

  function hideModal(){
    setImgGroupName(null)
    setImgIndex(0)
    setFilenames([])
    setModalVisible(false)
  }

  function event(details, i){
    const hyphenatedName = details.name.split(" ").join("-")
    return(
      <section className="event" key={i}>
        <h3 id={hyphenatedName}>
          {details.name}
        </h3>

        <p className="event-date">
          {details.date}
        </p>

        {
          details.desc.map((paragraph, j) => {
            return <p key={j} dangerouslySetInnerHTML={{__html: paragraph}} />
          })
        }

        {
          details.logo ? <img className='img-fluid py-4' src={`/img/events/${hyphenatedName}/${details.logo}`} /> : null
        }

        <div className="row gy-4 thumbnailGroup" data-group-name={hyphenatedName}>
          { details.thumbs?.map((path, j) =>{
            return (
                <img key={j}
                  className="img-fluid col-4 rounded-1 thumbnail"
                  src={`/img/events/${hyphenatedName}/thumbs/${path}`}
                  onClick={()=>showModal(hyphenatedName, j, details.thumbs)}
                />
              )
            })
          }
        </div>
      </section>
    )
  }

  return(
    <div id="events">
      <h1>Events</h1>

      <p>
        If you'd like to host an event at the PGH Dance Game Space,
        send an email to <code>pgh.dance.game.space@gmail.com</code> or
        DM <code>quietly_turning</code> on Discord.
      </p>

      <hr style={{"margin": "2em 0em"}} />

      <section className="event-group">
        <h2 id="Upcoming-Events">Upcoming Events</h2>
        { upcomingEvents.map((upcomingEvent,i) => event(upcomingEvent, i)) }
      </section>

      <section className="event-group">
        <h2 id="Past-Events">Past Events</h2>
        { pastEvents.map((pastEvent, i) => event(pastEvent, i)) }
      </section>

      <Modal {...modalProps} />
    </div>
  )
}

export default EventsPage