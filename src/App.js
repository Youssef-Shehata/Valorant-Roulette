// App.js
import { useState, useEffect, useCallback } from 'react';

const MAPS = ["ascent", "sunset", "lotus", "pearl", "fracture", "breeze", "icebox", "bind", "haven", "split", "abyss"]

const MAP_BASED = {
    ascent: {
        smokes: ["astra", "brimstone", "omen", "clove"],
        initiators: ["breach", "teho", "kay0", "skye", "sova", "fade"],
        sentinels: ["chamber", "cypher", "killjoy", "sage", "deadlock", "vyse"],
        duelists: ["jett", "phoenix", "raze", "reyna", "yoru", "iso"]
    },
    sunset: {
        smokes: ["astra", "brimstone", "omen", "clove"],
        initiators: ["breach", "teho", "kay0", "skye", "sova", "fade"],
        sentinels: ["chamber", "cypher", "killjoy", "sage", "deadlock", "vyse"],
        duelists: ["jett", "neon", "phoenix", "raze", "reyna", "yoru", "iso"]
    },

    lotus: {
        smokes: ["brimstone", "omen", "clove"],
        initiators: ["breach", "teho", "skye", "sova"],
        sentinels: ["chamber", "cypher", "killjoy", "sage", "deadlock"],
        duelists: ["jett", "neon", "raze", "reyna", "iso"]
    },

    pearl: {
        smokes: ["astra", "brimstone", "harbor", "clove"],
        initiators: ["breach", "teho", "fade"],
        sentinels: ["chamber", "cypher", "killjoy", "sage", "deadlock"],
        duelists: ["jett", "phoenix", "raze", "reyna", "iso"]
    },

    fracture: {
        smokes: ["brimstone", "viper", "harbor", "omen", "clove"],
        initiators: ["breach", "teho", "kay0", "skye"],
        sentinels: ["chamber", "cypher", "killjoy", "sage"],
        duelists: ["jett", "neon", "phoenix", "raze", "reyna", "yoru", "iso"]
    },

    breeze: {
        smokes: ["brimstone", "viper", "harbor", "omen", "clove"],
        initiators: ["kay0", "skye", "sova",],
        sentinels: ["chamber", "cypher", "killjoy", "sage",],
        duelists: ["jett", "neon", "raze", "reyna", "yoru", "iso"]
    },

    icebox: {
        smokes: ["astra", "brimstone", "omen", "clove"],
        initiators: ["breach", "teho", "skye", "sova",],
        sentinels: ["chamber", "cypher", "killjoy", "sage", "deadlock",],
        duelists: ["jett", "neon", "phoenix", "raze", "reyna", "iso"]
    },

    bind: {
        smokes: ["astra", "brimstone", "omen", "clove"],
        initiators: ["breach", "teho", "skye", "sova",],
        sentinels: ["chamber", "cypher", "killjoy", "sage", "deadlock",],
        duelists: ["jett", "neon", "phoenix", "raze", "reyna", "yoru", "iso"]
    },

    haven: {
        smokes: ["astra", "brimstone", "omen", "clove"],
        initiators: ["breach", "teho", "skye", "sova", "fade"],
        sentinels: ["chamber", "cypher", "killjoy", "sage", "deadlock"],
        duelists: ["jett", "neon", "phoenix", "raze", "reyna", "yoru", "iso"]
    },

    split: {
        smokes: ["astra", "brimstone", "omen", "clove"],
        initiators: ["breach", "teho", "kay0", "skye", "fade"],
        sentinels: ["chamber", "cypher", "killjoy", "sage", "deadlock",],
        duelists: ["jett", "phoenix", "raze", "reyna", "yoru", "iso"]
    },
    abyss: {
        smokes: ["astra", "brimstone", "harbor", "omen", "clove"],
        initiators: ["breach", "teho", "kay0", "skye", "sova", "fade"],
        sentinels: ["chamber", "cypher", "killjoy", "sage", "deadlock", "vyse"],
        duelists: ["jett", "neon", "phoenix", "raze", "reyna", "yoru", "iso"]
    },
}
const AGENT_DATA = {
    smokes: ["astra", "brimstone", "viper", "harbor", "omen", "clove"],
    initiators: ["breach", "teho", "kay0", "skye", "sova", "fade"],
    sentinels: ["chamber", "cypher", "killjoy", "sage", "deadlock", "vyse"],
    duelists: ["jett", "neon", "phoenix", "raze", "reyna", "yoru", "iso"]
};

const MAP_ASSETS = Object.fromEntries(
    Object.entries({
        ascent: 'ascent.jpeg',
        sunset: 'sunset.jpeg',
        lotus: 'lotus.jpeg',
        pearl: 'pearl.jpeg',
        fracture: 'fracture.jpeg',
        breeze: 'breeze.jpeg',
        icebox: 'icebox.jpeg',
        bind: 'bind.jpeg',
        haven: 'haven.jpeg',
        split: 'split.jpeg',
        abyss: 'abyss.jpeg'
    }).map(([name, img]) => [
        name,
        {
            image: `${process.env.PUBLIC_URL}/icons/maps/${img}`,
            //link: `https://www.pinterest.com/pin/${Math.random().toString(36).slice(2)}/`
        }
    ])
);

const AGENT_ASSETS = Object.fromEntries(
    Object.entries({
        brimstone: 'brimstone.jpeg',
        viper: 'viper.jpeg',
        harbor: 'harbor.jpeg',
        astra: 'astra.jpeg',
        omen: 'omen.jpeg',
        breach: 'breach.jpeg',
        teho: 'teho.jpeg',
        kay0: 'kay0.jpeg',
        skye: 'skye.jpeg',
        sova: 'sova.jpeg',
        fade: 'fade.jpeg',
        chamber: 'chamber.jpeg',
        cypher: 'cypher.jpeg',
        sage: 'sage.jpeg',
        killjoy: 'killjoy.jpeg',
        deadlock: 'deadlock.jpeg',
        neon: 'neon.jpeg',
        jett: 'jett.jpeg',
        raze: 'raze.jpeg',
        yoru: 'yoru.jpeg',
        reyna: 'reyna.jpeg',
        iso: 'iso.jpeg',
        phoenix: 'phoenix.jpeg',
        clove: 'clove.jpeg',
        vyse: 'vyse.jpeg'
    }).map(([name, img]) => [
        name,
        {
            image: `${process.env.PUBLIC_URL}/icons/agents/${img}`,
            //link: `https://www.pinterest.com/pin/${Math.random().toString(36).slice(2)}/`
        }
    ])
);

const getRandomAgent = () => {
    const agents = Object.keys(AGENT_ASSETS);
    return agents[Math.floor(Math.random() * agents.length)];
};

const generateTeam = (agentData) => {
    const roles = Object.entries(agentData).map(([role, agents]) => ({
        role,
        agent: agents[Math.floor(Math.random() * agents.length)]
    }));

    const duelists = AGENT_DATA.duelists.filter(a => a !== roles.find(r => r.role === 'duelists')?.agent);
    const fifth = duelists[Math.floor(Math.random() * duelists.length)];

    return [...roles.map(r => r.agent), fifth].sort(() => Math.random() - 0.5);
};

function App() {
    const [view, setView] = useState('menu');
    const [currentMap, setMap] = useState('');
    const [team, setTeam] = useState([]);
    const [agent, setAgent] = useState('');

    const refreshData = useCallback(() => {
        setTeam(generateTeam(AGENT_DATA));
        setAgent(getRandomAgent());
    }, []);

    useEffect(() => { refreshData() }, [refreshData]);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>VALORANT ROULETTE</h1>
                <div className="header-gradient"></div>
            </header>

            <main className="main-content">
                {view === 'menu' && (
                    <div className="role-selection">
                        <div
                            className="role-card "
                            onClick={() => setView('team')}
                        >
                            <h2>Random Team</h2>
                            <p>Generate complete team composition</p>
                        </div>

                        <div
                            className="role-card "
                            onClick={() => setView('agent')}
                        >
                            <h2>Random Agent</h2>
                            <p>Get single random agent</p>
                        </div>
                        <div
                            className="role-card "
                            onClick={() => setView('map')}
                        >
                            <h2>Map Based</h2>
                            <p>Get a random team based on the map</p>
                        </div>
                    </div>
                )}


                {view == 'map' && (
                    <div className={`results-container ${view}`}>
                        <button
                            className="close-button"
                            onClick={() => setView('menu')}
                        >
                            &times;
                        </button>

                        <div className="team-grid">
                            {MAPS.map((map) => (
                                <MapCard key={map} map={map} setMap={setMap} setView={setView} />
                            ))}
                        </div>

                        <div style={{ paddingTop: '2rem', fontSize: '20px' }}>
                            Generated teams are based on the owner's taste, and follow no industry standards ( I don't watch VCT ).
                        </div>

                    </div>
                )}
                {view !== 'menu' && view != 'map' && (
                    <div className={`results-container ${view}`}>
                        <button
                            className="close-button"
                            onClick={() => setView('menu')}
                        >
                            &times;
                        </button>

                        {view === 'team' && (
                            <div className="team-grid">
                                {team.map((agent) => (
                                    <AgentCard key={agent} agent={agent} />
                                ))}
                            </div>
                        )}

                        {view === 'map-team' && (
                            <>
                                <div className='map-header'>{currentMap.toUpperCase()}</div>
                                <div className="team-grid">
                                    {generateTeam(MAP_BASED[currentMap]).map((agent) => (
                                        <AgentCard key={agent} agent={agent} />
                                    ))}
                                </div>
                            </>
                        )}
                        {view === 'agent' && <AgentCard agent={agent} fullSize />}

                        <button
                            className="refresh-button"
                            onClick={refreshData}
                        >
                            Generate New
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

const AgentCard = ({ agent, fullSize }) => {
    const { image } = AGENT_ASSETS[agent];

    return (
        <div className={`agent-card ${fullSize ? 'full' : ''}`}>
            <img
                src={image}
                alt={agent}
            />
            <div className="agent-name">{agent.toUpperCase()}</div>
        </div>
    );
};
const MapCard = ({ map, fullSize, setMap, setView }) => {
    const { image } = MAP_ASSETS[map];

    return (
        <div className={`agent-card ${fullSize ? 'full' : ''}`}>
            <img
                src={image}
                alt={map}
                onClick={() => {
                    setMap(map)
                    setView('map-team')
                }}

            />
            <div className="agent-name">{map.toUpperCase()}</div>
        </div>
    );
};


export default App;
