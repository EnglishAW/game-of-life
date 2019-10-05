import { h } from 'preact'
import GameContainer from './components/GameContainer'
import { css } from 'emotion'

export const App = () => {
    return (
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
    )
}
