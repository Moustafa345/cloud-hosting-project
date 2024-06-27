

const loading = () => {
    return (

        <>

        
            <section className="fix-height flex items-center justify-center px-5 lg:px-20">

                <div className="px-4 pt-12 pb-5 bg-gray-200 rounded w-full">
                    <h2 className="text-gray-700 mb-4"></h2>
                    <form className="flex flex-col animate-pulse">
                        <input className="mb-4 border rounded p-2" />
                        <textarea
                            className="mb-4 p-2 rounded resize-none"
                            rows={5}></textarea>
                        <button
                            className="bg-gray-300 p-2 rounded-lg font-bold h-11">
                        </button>
                    </form>
                </div>

                <div>
                    <div className="flex items-center">
                        <div className="me-1" />
                        <span className="hidden lg:block"></span>
                    </div>
                    <ul className="mt-10 flex items-center justify-center flex-col lg:items-start">
                        <div className="flex items-center  mb-5 lg:border-b border-gray-300 transition">
                            <div className="me-1" />
                            <span className="hidden lg:block"></span>
                        </div>
                        <div className="flex items-center mb-5 lg:border-b border-gray-300 transition">
                            <div className="me-1" />
                            <span className="hidden lg:block"></span>
                        </div>
                    </ul>
                </div>

            </section>
        </>




    )
}

export default loading