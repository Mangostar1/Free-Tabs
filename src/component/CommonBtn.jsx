export default function CommonBtn(props) {
    return(
        <button onClick={props.handleBtn} className={props.classCss}>{props.name}</button>
    )
}