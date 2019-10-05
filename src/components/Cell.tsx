import { h } from 'preact'
import { css } from 'emotion'
import { handleCellClickType } from './GameContainer'

export interface CellProps {
    isAlive: boolean
    size: number
    position: { x: number; y: number }
    onClick: handleCellClickType
}

// Render the Cell based on the array from the GameContainer
export const Cell = (props: CellProps) => {
    const { size, isAlive, position, onClick } = props
    return (
        <div
            className={wrapperClass(size, isAlive)}
            onContextMenu={event => event.preventDefault()}
            onMouseDown={event => {
                event.preventDefault()
                onClick({ x: position.x, y: position.y })
            }}
            onMouseEnter={event => {
                event.preventDefault()
                if (event.buttons === 1) {
                    onClick({ x: position.x, y: position.y }, 'ADD')
                }
                if (event.buttons === 2) {
                    onClick({ x: position.x, y: position.y }, 'DELETE')
                }
            }}
        ></div>
    )
}

const wrapperClass = (size, isAlive) => css`
    width: ${size - 1};
    height: ${size - 1};
    margin: 1px 1px 0 0;
    background-color: ${isAlive ? '#FFCC63' : '#1b1e2b'};
    box-sizing: border-box;
`
