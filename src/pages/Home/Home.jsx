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
            <section className='flex justify-center gap-4 bg-red-100 p-20'>
                <ImgMain src="https://picsum.photos/800/400" alt="tab-guitar" classCss=""/>
                <div className=''>
                    <h2 className='text-center text-xl font-semibold'>Tus Tabs</h2>
                    <p className='text-center m-auto'>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. 
                        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, 
                        venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus 
                        elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend 
                        ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, 
                    </p>
                </div>
            </section>
            <section className='flex flex-row justify-center items-center'>
                <HomeArticle 
                    title="Some Title 1" 
                    text="
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam deserunt nam fugit dolorem labore commodi, 
                    et velit eaque possimus. Architecto illum rerum veniam ipsam beatae dolore odio pariatur doloribus repellendus.
                    "
                    cssArticle="flex flex-col m-4 p-4 rounded-md bg-indigo-100"
                    cssTitle="text-xl font-semibold"
                    cssText="" 
                />
                <HomeArticle 
                    title="Some Title 2" 
                    text="
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam deserunt nam fugit dolorem labore commodi, 
                    et velit eaque possimus. Architecto illum rerum veniam ipsam beatae dolore odio pariatur doloribus repellendus.
                    "
                    cssArticle="flex flex-col m-4 p-4 rounded-md bg-indigo-100"
                    cssTitle="text-xl font-semibold"
                    cssText="" 
                />
                <HomeArticle 
                    title="Some Title 3" 
                    text="
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam deserunt nam fugit dolorem labore commodi, 
                    et velit eaque possimus. Architecto illum rerum veniam ipsam beatae dolore odio pariatur doloribus repellendus.
                    "
                    cssArticle="flex flex-col m-4 p-4 rounded-md bg-indigo-100"
                    cssTitle="text-xl font-semibold"
                    cssText="" 
                />
            </section>
        </main>
    )
}