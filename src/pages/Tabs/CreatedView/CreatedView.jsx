export default function CreatedView({component}) {
    return(
        <main className=''>
            <h1>Aca se veran las tab recien creadas por el usuario</h1>
            <section id='Tab-Saved' className='bg-gray-100'>
                {component}
            </section>
        </main>
        
    )
}