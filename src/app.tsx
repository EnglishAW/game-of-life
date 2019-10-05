import { h } from 'preact'
import GameContainer from './components/GameContainer'
import { GithubCorner } from './ui-components/GithubCorner'
import { css } from 'emotion'

export const App = () => {
    return (
        <div>
            <GithubCorner
                link="https://github.com/EnglishAW/game-of-life"
                fill="#64CEAA"
                logoColor="#292d3f"
            />
            <div
                className={css`
                    display: flex;
                    flex-flow: column;
                    justify-content: center;
                    align-items: center;
                `}
            >
                <h1>Game of Life</h1>
                <GameContainer />
            </div>
        </div>
    )
}
