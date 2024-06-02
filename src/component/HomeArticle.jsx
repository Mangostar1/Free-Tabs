export default function HomeArticle(props) {
    return(
        <article className={props.cssArticle}>

            {
                props.title ? 
                    <h2 className={props.cssTitle}>
                        {props.title}
                    </h2> : null
            }

            {
                props.imageIcon ? 
                    <div className="icon-container flex justify-center items-center text-orange-500">
                    {props.imageIcon}
                    </div>
                : null
            }
            
            <p className={props.cssText}>
                {props.text}
            </p>
        </article>
    )
}