export default function HomeArticle(props) {
    return(
        <article className={props.cssArticle}>
            <h2 className={props.cssTitle}>
                {props.title}
            </h2>
            <p className={props.cssText}>
                {props.text}
            </p>
        </article>
    )
}