import { h } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import { GameBoard } from './GameBoard'
import { GameOptions } from './GameOptions'
import { css } from 'emotion'

export interface GameContainerProps {}

// TODO: Add these as user options in the future
const WIDTH = 60
const HEIGHT = 30
const CELL_SIZE = 15

// Arbitrary Speed to miliseconds
const speedMap = {
    1: 1200,
    2: 750,
    3: 500,
    4: 250,
    5: 100,
}

export type handleCellClickType = (
    position: PositionType,
    action?: CellClickAction
) => void

export const GameContainer = () => {
    const initialCellState = generateEmptyBoardArray(WIDTH, HEIGHT)
    const [isRunning, setIsRunning] = useState(false)
    const [speed, setSpeed] = useState(4)
    const [cellState, setCellState]: [number[][], any] = useState(
        initialCellState
    )

    // useRef to prevent unneeded rerendering
    const gameStep = useRef(null)
    const isUpdateQueued = useRef(null)

    /* GAME LOOP
     * Inorder to create a game loop we will queue the next game step on render
     * if the game is running and a game step has not already been queued.
     * We use refs to avoid uneeded renders when managing the game step queuing.
     *
     * NOTE:
     *   React/Preact isn't really meant to handle things like a controlled render
     *   loop so this is a bit of a hack but works for a simple Game of Life example
     */
    useEffect(() => {
        if (isRunning && !isUpdateQueued.current) {
            isUpdateQueued.current = true

            gameStep.current = setTimeout(() => {
                update()
                isUpdateQueued.current = false
            }, speedMap[speed])
        }
    }, [isRunning, cellState])

    // If user pauses cancel the next queued game step
    if (!isRunning) {
        clearTimeout(gameStep.current)
        isUpdateQueued.current = false
    }

    /* * *  Event Handlers * * */

    // Cancel the next queued game step and stop running the sim
    const hadleRunToggle = event => {
        event.preventDefault()
        clearInterval(gameStep.current)
        setIsRunning(!isRunning)
    }

    const handleClear = () => {
        event.preventDefault()
        setCellState(initialCellState)
    }

    //If paused then toggle the clicked cell living or dead
    const handleCellClick: handleCellClickType = (
        position,
        action = 'TOGGLE'
    ) => {
        if (!isRunning) {
            // Mutable process :( refactor with map
            const updateCells = cellState.slice()
            updateCells[position.y][position.x] =
                action === 'TOGGLE'
                    ? !!updateCells[position.y][position.x]
                        ? 0
                        : 1
                    : action === 'ADD'
                    ? 1
                    : 0
            setCellState(updateCells)
        }
    }
    const handleIncrementSpeed = () => {
        speed < 5 && setSpeed(speed + 1)
    }
    const handleDecrementSpeed = () => {
        speed > 1 && setSpeed(speed - 1)
    }

    const update = () => {
        if (!!isRunning) {
            // Set the next generation by mapping through
            // each cell and applying the rules of life
            const updateCells = cellState.map((row, y) => {
                return row.map((cell, x) => {
                    const neighborCount = getNeighborCount(cellState, { x, y })

                    // Apply Rules of Life
                    if (cell === 0) {
                        return neighborCount === 3 ? 1 : 0
                    }
                    if (cell === 1) {
                        return neighborCount < 2 || neighborCount > 3 ? 0 : 1
                    }
                })
            })
            setCellState(updateCells)
        }
    }
    return (
        <div
            className={css`
                display: flex;
            `}
        >
            <GameBoard
                width={WIDTH}
                height={HEIGHT}
                cellSize={CELL_SIZE}
                cellState={cellState}
                onCellClick={handleCellClick}
            />
            <GameOptions
                isRunning={isRunning}
                onRunToggle={hadleRunToggle}
                onClear={handleClear}
                speed={speed}
                onIncrementSpeed={handleIncrementSpeed}
                onDecrementSpeed={handleDecrementSpeed}
            />
        </div>
    )
}

const generateEmptyBoardArray = (width: number, height: number) => {
    return Array.from(Array(height).fill(0), () => new Array(width).fill(0))
}

const getNeighborCount = (array, currentIndex: { x: number; y: number }) => {
    const { x, y } = currentIndex
    const row_length = array.length
    const col_length = array[0].length
    let neighborCount = 0
    const neighborExists = (x: number, y: number) => {
        return (
            x < col_length &&
            x >= 0 &&
            y < row_length &&
            y >= 0 &&
            array[y][x] === 1
        )
    }

    // 0 top-left
    if (neighborExists(x - 1, y - 1)) {
        neighborCount += 1
    }
    // 1 top
    if (neighborExists(x, y - 1)) {
        neighborCount += 1
    }
    // 2 top-right
    if (neighborExists(x + 1, y - 1)) {
        neighborCount += 1
    }
    // 3 right
    if (neighborExists(x + 1, y)) {
        neighborCount += 1
    }
    // 4 bottom-right
    if (neighborExists(x + 1, y + 1)) {
        neighborCount += 1
    }
    // 5 bottom
    if (neighborExists(x, y + 1)) {
        neighborCount += 1
    }
    // 6 bottom-left
    if (neighborExists(x - 1, y + 1)) {
        neighborCount += 1
    }
    // 7 left
    if (neighborExists(x - 1, y)) {
        neighborCount += 1
    }

    //console.log(neighborCount)

    return neighborCount
}

export default GameContainer
