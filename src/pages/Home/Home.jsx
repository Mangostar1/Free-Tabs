import React from 'react';
import { useNavigate } from "react-router-dom";

//components
import CommonBtn from 'component/CommonBtn'
import ImgMain from 'component/ImgMain'
import HomeArticle from 'component/HomeArticle'



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
                <h2 className='text-center'>Tus Tabs</h2>
                <div className='flex justify-center gap-4 m-8 bg-red-400 relative p-44'>
                    <ImgMain src="https://picsum.photos/600/200" alt="tab-guitar" classCss="absolute top-1/4 left-1/4"/>
                    <ImgMain src="https://picsum.photos/600/200" alt="tab-bass" classCss="absolute bottom-1/4 right-1/4"/>
                </div>
            </section>
            <section className='flex flex-row justify-center items-center'>
                <HomeArticle 
                    title="Some Title 1" 
                    text="Some Text 1"
                    cssArticle="flex flex-col m-4 p-4 rounded-md bg-indigo-100"
                    cssTitle="text-xl font-semibold"
                    cssText="" 
                />
                <HomeArticle 
                    title="Some Title 2" 
                    text="Some Text 2"
                    cssArticle="flex flex-col m-4 p-4 rounded-md bg-indigo-100"
                    cssTitle="text-xl font-semibold"
                    cssText="" 
                />
                <HomeArticle 
                    title="Some Title 3" 
                    text="Some Text 3"
                    cssArticle="flex flex-col m-4 p-4 rounded-md bg-indigo-100"
                    cssTitle="text-xl font-semibold"
                    cssText="" 
                />
            </section>
        </main>
    )
}