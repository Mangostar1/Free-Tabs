import React from 'react';
import { useNavigate } from "react-router-dom";

//components
import CommonBtn from 'component/CommonBtn'


export default function Home() {
    
    const navigate = useNavigate();


    const goToCreateNewAcount = () => {
        navigate('/user/login')
    }

    const goToCreateNewTab = () => {
        navigate('/tab/create')
    }

    return(
        <main className="bg-slate-50">
            <section className="
                bg-[url('assets/imgs/op-2.jpg')] bg-cover bg-no-repeat bg-[center_top_1rem] 
                h-128 
                flex flex-col items-center 
                xl:bg-[center_top_-8rem]">
                <h1 className='text-gray-100 text-8xl font-bold text-center mt-32'>Free Tabs</h1>
                <div className='mt-10 flex flex-row gap-4'>
                    <CommonBtn 
                        handleBtn={goToCreateNewAcount}
                        name="Create Acount" 
                        classCss="text-gray-700 text-xl bg-orange-200 px-4 py-2 rounded-xl ease-out duration-500 hover:bg-orange-600 hover:text-gray-300"
                    />
                    <CommonBtn 
                        handleBtn={goToCreateNewTab}
                        name="Try Now" 
                        classCss="text-gray-700 text-xl bg-orange-200 px-4 py-2 rounded-xl ease-out duration-500 hover:bg-orange-600 hover:text-gray-300"
                    />
                </div>
            </section>
            <section className=''>
                <h2 className='text-center'>Hola</h2>
            </section>
        </main>
    )
}