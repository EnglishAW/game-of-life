import { h } from 'preact'
import { css } from 'emotion'
import { IncrementalButton } from '../ui-components/IncrementalButton'

export interface GameOptionsProps {
    isRunning: boolean
    speed: number
    onRunToggle: any
    onClear: any
    onIncrementSpeed: any
    onDecrementSpeed: any
}

export const GameOptions = (props: GameOptionsProps) => {
    const {
        isRunning,
        onClear,
        speed,
        onRunToggle,
        onIncrementSpeed,
        onDecrementSpeed,
    } = props
    return (
        <div className={wrapperClass}>
            <h3
                className={css`
                    color: ${isRunning ? '#C2E988' : '#F27076'};
                `}
            >
                {isRunning ? 'Running' : 'Paused'}
            </h3>
            <div
                className={css`
                    display: flex;
                    align-items: center;
                `}
            >
                <div>Speed: {speed}</div>
                <IncrementalButton
                    incrementLabel="+"
                    decrementLabel="-"
                    incrementOnClick={onIncrementSpeed}
                    decrementOnClick={onDecrementSpeed}
                />
            </div>
            <div className={ControlButtonsClass}>
                <button onClick={onRunToggle}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={onClear} disabled={isRunning}>
                    Clear
                </button>
            </div>
        </div>
    )
}

const wrapperClass = css`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    min-width: 150px;
    margin: 0 5px;
    padding: 5px;
    background-color: #292d3f;
    border: 2px solid #4e526e;
    border-radius: 5px;
    color: #dddddd;
`

const ControlButtonsClass = css`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
`
