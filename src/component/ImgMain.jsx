export default function ImgMain(props) {
    return(
        <img src={props.src} alt={props.alt} className={props.classCss} width={props.width} height={props.height} />
    )
}