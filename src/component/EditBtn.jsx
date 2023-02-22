export default function EditBtn(props) {
    const handleTest = () => {
        console.log('funcionando 2');
    }
    return(
        <button onClick={handleTest} className="bg-orange-200 px-4 py-2 ml-5 rounded hover:bg-orange-100">{props.name}</button>
    )
}