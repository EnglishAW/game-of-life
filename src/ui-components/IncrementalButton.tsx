import { h } from 'preact'
import { css } from 'emotion'

export interface IncrementalButtonProps {
    decrementLabel: string
    decrementOnClick: any
    incrementLabel: string
    incrementOnClick: any
}

export const IncrementalButton = (props: IncrementalButtonProps) => {
    const {
        decrementLabel,
        incrementLabel,
        incrementOnClick,
        decrementOnClick,
    } = props
    return (
        <div className={buttonGroupClass}>
            <div className={buttonFirstClass} onClick={decrementOnClick}>
                {decrementLabel}
            </div>
            <div className={buttonClass} onClick={incrementOnClick}>
                {incrementLabel}
            </div>
        </div>
    )
}

const noSelectClass = css`
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
`
const buttonGroupClass = css`
    display: flex;
    margin: 5px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    align-items: center;
`

const buttonClass = css`
    display: flex;
    padding: 3px 10px;
    justify-content: center;
    align-items: center;
    ${noSelectClass};
`

const buttonFirstClass = css`
    ${buttonClass};
    border-right: 1px solid #dddddd;
`

export default IncrementalButton
