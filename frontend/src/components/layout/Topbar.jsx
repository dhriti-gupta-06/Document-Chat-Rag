function Topbar() {

    return (

        <header className="h-20 border-b border-gray-800 bg-[#111827] flex items-center justify-between px-8">

            <div>

                <h2 className="text-2xl font-bold">

                    Document Chat AI

                </h2>

                <p className="text-gray-400">

                    Powered by LangChain + Ollama

                </p>

            </div>

        </header>

    );

}

export default Topbar;