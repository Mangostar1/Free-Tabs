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

//assets
import mainImage from 'assets/imgs/main-page.jpg';


export default function Home() {
  const navigate = useNavigate();

  const goToCreateNewAcount = () => {
    navigate("/sign_up");
  };

  const goToCreateNewTab = () => {
    navigate("/tab/create");
  };

  return (
    <>
      <main className="bg-slate-50 text-zinc-800 pb-2 main">
        <section
          className="
                  bg-[url('assets/imgs/op-2.jpg')] bg-cover bg-no-repeat bg-[center_top_1rem] 
                  h-screen 
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
            src={mainImage}
            alt="tab-guitar"
            width="800"
            height="400"
            classCss="rounded"
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
            cssArticle="block max-w-sm p-6 bg-slate-100 border border-zinc-400 rounded-lg shadow"
            cssText="font-normal text-gray-700"
            imageIcon={<EditIcon />}
          />
          <HomeArticle
            text="
                      Accede a una biblioteca de tablaturas actualizadas y populares para descubrir nuevas canciones para tocar.
                      "
            cssArticle="block max-w-sm p-6 bg-slate-100 border border-zinc-400 rounded-lg shadow"
            cssText="font-normal text-gray-700"
            imageIcon={<MusicNoteIcon />}
          />
          <HomeArticle
            text="
                      Comparte tus tablaturas con otros músicos y colabora en proyectos musicales.
                      "
            cssArticle="block max-w-sm p-6 bg-slate-100 border border-zinc-400 rounded-lg shadow"
            cssText="font-normal text-gray-700"
            imageIcon={<ShareIcon />}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
