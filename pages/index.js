import { useRef } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";

// Styles
// import '../styles/index.css'

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  
  const words = [
    "Data Science",
    "Deep Learning",
    "Generative AI",
    "LLM",
    "Graph Machine Learning",
    "Python",
    "Data Analysis",
    "Statistics",
    "SQL",
    "Azure",
    "Knime",
  ];
  
  

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>
      {/* 
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div> */}

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-40 mt-40">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="mb-10 flex justify-center text-center text-xs tablet:text-6xl laptop:text-6xl laptopl:text-3xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-5/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="flex justify-center text-base tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-5/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="flex justify-center text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-3xl p-1 tablet:p-2 text-bold w-full laptop:w-5/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="flex justify-center text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-3xl p-1 tablet:p-2 text-bold w-full laptop:w-5/5"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />

          <div className="mt-20 relative overflow-hidden w-full h-16 bg-transparent flex items-center">
            {/* Carousel Container */}
            <div className="absolute whitespace-nowrap animate-scroll">
              {/* First Set of Words */}
              {words.map((word, index) => (
                <span
                  key={index}
                  className="mx-10 text-xl font-semibold text-gray-300"
                >
                  {word}
                </span>
              ))}
              {/* Duplicate Set of Words for Seamless Loop */}
              {words.map((word, index) => (
                <span
                  key={`duplicate-${index}`}
                  className="mx-10 text-xl font-semibold text-gray-300"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 laptop:mt-40 laptop:p-0" ref={aboutRef}>
          <h1 className="text-2xl text-bold">About.</h1>
          <p className="mt-10 text-md laptop:text-xl w-full laptop:w-5/5">
            {data.aboutpara}
          </p>
          <p className="mt-10 text-md laptop:text-xl w-full laptop:w-5/5">
            {data.aboutpara2}
          </p>
        </div>

        <div className="mt-40 laptop:mt-50 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url)}
              />
            ))}
          </div>
        </div>

        {/* <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Services.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div> */}
        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        
          {/* <Footer /> */}
      </div>
    </div>
  );
}
