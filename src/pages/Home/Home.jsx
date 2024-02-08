import React from "react";
import { useNavigate } from "react-router-dom";

//Material UI
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ShareIcon from '@mui/icons-material/Share';

//components
import ImgMain from "component/ImgMain";
import HomeArticle from "component/HomeArticle";
import Footer from "component/Footer";


export default function Home() {
  const navigate = useNavigate();

  const goToCreateNewAcount = () => {
    navigate("/user/sign_up");
  };

  const goToCreateNewTab = () => {
    navigate("/tab/create");
  };

  return (
    <>
      <main className="">
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
            <Button onClick={goToCreateNewAcount} variant="text">Crear Cuenta</Button>
            <Button onClick={goToCreateNewTab} variant="text">Pruebalo Ahora</Button>
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
        <section className="flex flex-row justify-center items-center gap-4 mb-5">
          <HomeArticle
            text="Crea tablaturas de alta calidad en minutos con nuestro editor intuitivo y herramientas avanzadas."
            cssArticle="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            cssText="font-normal text-gray-700 dark:text-gray-400"
            imageIcon={<EditIcon style={{ color: '#FFFFFF' }}/>}
          />
          <HomeArticle
            text="
                      Accede a una biblioteca de tablaturas actualizadas y populares para descubrir nuevas canciones para tocar.
                      "
            cssArticle="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            cssText="font-normal text-gray-700 dark:text-gray-400"
            imageIcon={<MusicNoteIcon style={{ color: '#FFFFFF' }}/>}
          />
          <HomeArticle
            text="
                      Comparte tus tablaturas con otros músicos y colabora en proyectos musicales.
                      "
            cssArticle="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            cssText="font-normal text-gray-700 dark:text-gray-400"
            imageIcon={<ShareIcon style={{ color: '#FFFFFF' }}/>}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
