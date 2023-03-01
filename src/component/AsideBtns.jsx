export default function AsideBtns(props) {
    return(
        <button onClick={props.onClick} className='bg-orange-200 px-4 py-2 mt-5 ml-5 mr-5 rounded hover:bg-orange-100'>{props.instrument}</button>
    )
}