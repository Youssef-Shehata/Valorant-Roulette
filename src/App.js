import React, { useState, useEffect } from 'react';



const brimstone = process.env.PUBLIC_URL + '/icons/brimstone.jpeg'
const viper = process.env.PUBLIC_URL + '/icons/viper.jpeg'
const harbor = process.env.PUBLIC_URL + '/icons/harbor.jpeg'
const astra = process.env.PUBLIC_URL + '/icons/astra.jpeg'
const omen = process.env.PUBLIC_URL + '/icons/omen.jpeg'


const breach = process.env.PUBLIC_URL + '/icons/breach.jpeg'
const kay0 = process.env.PUBLIC_URL + '/icons/kay0.jpeg'
const skye = process.env.PUBLIC_URL + '/icons/skye.jpeg'
const sova = process.env.PUBLIC_URL + '/icons/sova.jpeg'
const fade = process.env.PUBLIC_URL + '/icons/fade.jpeg'



const chamber = process.env.PUBLIC_URL + '/icons/chamber.jpeg'
const cypher = process.env.PUBLIC_URL + '/icons/cypher.jpeg'
const sage = process.env.PUBLIC_URL + '/icons/sage.jpeg'
const killjoy = process.env.PUBLIC_URL + '/icons/killjoy.jpeg'
const deadlock = process.env.PUBLIC_URL + '/icons/deadlock.jpeg'

const neon = process.env.PUBLIC_URL + '/icons/neon.jpeg'
const jett = process.env.PUBLIC_URL + '/icons/jett.jpeg'
const raze = process.env.PUBLIC_URL + '/icons/raze.jpeg'
const yoru = process.env.PUBLIC_URL + '/icons/yoru.jpeg'
const reyna = process.env.PUBLIC_URL + '/icons/reyna.jpeg'
const iso = process.env.PUBLIC_URL + '/icons/iso.jpeg'
const phoenix = process.env.PUBLIC_URL + '/icons/pheonix.jpeg'
const clove= process.env.PUBLIC_URL + '/icons/clove.jpeg'
const vyse= process.env.PUBLIC_URL + '/icons/vyse.jpeg'

const pics = {
    "brimstone": [brimstone, 'https://www.pinterest.com/pin/8092474323017466/'],
    "viper": [viper, 'https://www.pinterest.com/pin/281543720323733/'],
    "harbor": [harbor, 'https://www.pinterest.com/pin/822610688207606570/'],
    "astra": [astra, 'https://www.pinterest.com/pin/30328997480904900/'],
    "omen": [omen, 'https://www.pinterest.com/pin/34199278416554324/'],
    "breach": [breach, 'https://www.pinterest.com/pin/155092780909383288/'],
    "kay0": [kay0, 'https://www.pinterest.com/pin/155092780911595830/'],
    "skye": [skye, 'https://www.pinterest.com/pin/30328997481058498/'],
    "sova": [sova, 'https://www.pinterest.com/pin/618682067585769602/'],
    "fade": [fade, 'https://www.pinterest.com/pin/27303141482849838/'],
    "chamber": [chamber, 'https://www.pinterest.com/pin/11259067809050296/'],
    "cypher": [cypher, 'https://www.pinterest.com/pin/351140102211310746/'],
    "sage": [sage, 'https://www.pinterest.com/pin/369295238205400688/'],
    "killjoy": [killjoy, 'https://www.pinterest.com/pin/24558760462291038/'],
    "deadlock": [deadlock, 'https://www.pinterest.com/pin/39406565482722116/'],
    "neon": [neon, 'https://www.pinterest.com/pin/1829656092492980/'],
    "jett": [jett, 'https://www.pinterest.com/pin/322077810867303859/'],
    "raze": [raze, 'https://www.pinterest.com/pin/6333255721502615/'],
    "yoru": [yoru, 'https://www.pinterest.com/pin/25684660369578218/'],
    "reyna": [reyna, 'https://www.pinterest.com/pin/10696117857546075/'],
    "iso": [iso, 'https://www.pinterest.com/pin/85779567896485129/'],
    "phoenix": [phoenix, 'https://www.pinterest.com/pin/454722893641388202/'],
    "clove": [clove, 'https://www.pinterest.com/pin/582371795603234556/'],
    "vyse": [vyse, 'https://www.pinterest.com/pin/745697650834887505/'],
}

const data = {
    "smokes": [
        "astra",
        "brimstone",
        "viper",
        "harbor",
        "omen",
        "clove"
    ],
    "initiators": [
        "breach",
        "kay0",
        "skye",
        "sova",
        "fade"
    ],
    "sentinels": [
        "chamber",
        "cypher",
        "killjoy",
        "sage",
        "deadlock",
        "vyse"
    ],
    "duelists": [
        "jett",
        "neon",
        "phoenix",
        "raze",
        "reyna",
        "yoru",
        "iso"
    ]
}


const generateAgent = () => {
    const agents = Object.keys(pics)
    const agent = agents[Math.floor(Math.random() * agents.length)]
    return agent
}

const generateTeam = (data) => {
    // const names = ['smokes', 'initiators', 'sentinels', 'duelists']

    const smokes = data['smokes'];
    const inits = data['initiators'];
    const sens = data['sentinels'];
    const duels = data['duelists'];

    const smoker = smokes[Math.floor(Math.random() * smokes.length)];
    const initiator = inits[Math.floor(Math.random() * inits.length)];
    const sentinel = sens[Math.floor(Math.random() * sens.length)];
    const d1 = Math.floor(Math.random() * duels.length);
    const duelist1 = duels[d1]
    const team = [smoker, initiator, sentinel, duelist1];


    let d2 = Math.floor(Math.random() * duels.length);


    while (d1 === d2 || duels[d2] in team) {
        d2 = Math.floor(Math.random() * duels.length);
    }

    const fifth = duels[d2];

    team.push(fifth)

    const team2 = [];
    const j = Math.floor(Math.random() * 5);

    for (let i = 0; i < 5; i++) {
        team2.push(team[(j + i) % 5]);
    }

    return team2;
}


function App() {
    const [optionMenu, setOptionMenu] = useState(true)
    const [showTeam, setShowTeam] = useState(false)

    const [showAgent, setShowAgent] = useState(false)
    const [team, setTeam] = useState([])
    const [Agent, setAgent] = useState('')


    const [reRender, setreRender] = useState(0)

    const handleRandomTeam = () => {
        setOptionMenu(false)
        setShowTeam(true)
    }
    const handleRandomAgent = () => {
        setOptionMenu(false)
        setShowAgent(true)
    }


    const handleRender = () => {
        setreRender(reRender + 1)
    }

    const handleCloseAgents = () => {
        setShowTeam(false)
        setShowAgent(false)
        setOptionMenu(true)
    }
    useEffect(() => {
        const fetchTeam = () => {
            setTeam(generateTeam(data))
            setAgent(generateAgent())
        }

        fetchTeam()
    }, [reRender])

    const navigateToLink = (agent) => {
        // Use window.location.href to navigate to the specified link
        // window.location.href = pics[agent][1];
        window.open(pics[agent][1], '_blank');

        // console.log(pics[agent][1])
    };


    return (
        <>
            <div className='header'>Valorant Roulette</div>

            <div className="container" >

                {showTeam &&
                    <div className='agents-container'>

                        <div className='close' onClick={handleCloseAgents}>x</div>
                        <div className='agents'>
                            {team && team.map((agent) => {
                                const agentData = pics[agent];

                                if (agentData && agentData.length > 0) {
                                    return (
                                        <div className='agent' key={agent}>
                                            <img src={agentData[0]} alt={agent} onClick={() => navigateToLink(agent)} />
                                        </div>
                                    );
                                }

                                return null; // Return null if data is not available
                            })}
                        </div>
                        <button className='generator' onClick={handleRender}>New Team</button>

                    </div>

                }{
                    showAgent &&
                    <div className='agent-container'>
                        <div className='close' onClick={handleCloseAgents}>x</div>
                        <div className='agentmax' >

                            <img src={pics[Agent][0]} className='image' onClick={() => navigateToLink(Agent)}></img>
                            </div>
                        <button className='generator' onClick={handleRender}>New Agent</button>

                    </div>


                }
                {optionMenu && <div className='option' onClick={handleRandomTeam}>Team</div>}
                {optionMenu && <div className='option' onClick={handleRandomAgent}>Agent</div>}


            </div >









        </>
    );
}

export default App;
