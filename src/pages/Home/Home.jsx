import React from "react";
import { useNavigate } from "react-router-dom";

//components
import CommonBtn from "component/CommonBtn";
import ImgMain from "component/ImgMain";
import HomeArticle from "component/HomeArticle";

export default function Home() {
  const navigate = useNavigate();

  const goToCreateNewAcount = () => {
    navigate("/user/sign_up");
  };

  const goToCreateNewTab = () => {
    navigate("/tab/create");
  };

  return (
    <main className="bg-slate-50">
      <section
        className="
                bg-[url('assets/imgs/op-2.jpg')] bg-cover bg-no-repeat bg-[center_top_1rem] 
                h-128 
                flex flex-col items-center 
                xl:bg-[center_top_-8rem]"
      >
        <h1 className="text-gray-100 text-8xl font-bold text-center mt-32">
          Free Tabs
        </h1>
        <div className="mt-10 flex flex-row gap-4">
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
      <section className="flex justify-center gap-4 p-20">
        <ImgMain
          src="https://picsum.photos/800/400"
          alt="tab-guitar"
          classCss=""
        />
        <div className="">
          <h2 className="text-center text-xl font-semibold">Tus Tabs</h2>
          <p className="text-center m-auto">
            Toca tus canciones favoritas en tu guitarra o bajo con facilidad
            utilizando nuestro creador de tablaturas. Crea, edita y comparte tus
            propias tablaturas en cuestión de minutos. Con nuestro editor
            intuitivo y herramientas avanzadas, cualquier persona puede crear
            tablaturas de calidad profesional sin esfuerzo. Además, nuestra
            biblioteca de tablaturas populares y actualizadas te ayudará a
            descubrir nuevos temas para tocar. ¡Empieza a tocar como un
            profesional hoy mismo!
          </p>
        </div>
      </section>
      <section className="flex flex-row justify-center items-center">
        <HomeArticle
          title="Some Title 1"
          text="
                    Crea tablaturas de alta calidad en minutos con nuestro editor intuitivo y herramientas avanzadas.
                    "
          cssArticle="flex flex-col m-4 p-4 rounded-md bg-indigo-100"
          cssTitle="text-xl font-semibold"
          cssText=""
        />
        <HomeArticle
          title="Some Title 2"
          text="
                    Accede a una biblioteca de tablaturas actualizadas y populares para descubrir nuevas canciones para tocar.
                    "
          cssArticle="flex flex-col m-4 p-4 rounded-md bg-indigo-100"
          cssTitle="text-xl font-semibold"
          cssText=""
        />
        <HomeArticle
          title="Some Title 3"
          text="
                    Comparte tus tablaturas con otros músicos y colabora en proyectos musicales.
                    "
          cssArticle="flex flex-col m-4 p-4 rounded-md bg-indigo-100"
          cssTitle="text-xl font-semibold"
          cssText=""
        />
      </section>
      <footer>
        <div className="flex gap-4 justify-center py-8">
          <a href="https://www.google.com/">
            <img src="https://picsum.photos/35/35" alt="social-media" />
          </a>
          <a href="https://www.google.com/">
            <img src="https://picsum.photos/35/35" alt="social-media" />
          </a>
          <a href="https://www.google.com/">
            <img src="https://picsum.photos/35/35" alt="social-media" />
          </a>
        </div>
      </footer>
    </main>
  );
}
