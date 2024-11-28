import HomePage from "./home";

export default function Home() {
  return (
    <>
      <main className="h-dvh w-full">
        <HomePage />
      </main>
      <footer className="fixed bottom-4 flex w-full items-center justify-center">
        <p>
          Made with &#10084; by{" "}
          <a
            href="https://wintertech.xyz"
            className="underline duration-100 hover:text-neutral-300"
          >
            Winter Technologies
          </a>
        </p>
      </footer>
    </>
  );
}
