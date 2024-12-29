const LoginPage = () => {
    return (
        <section className="min-h-screen bg-background-panel-gray flex flex-col justify-center items-center">
            <div className="border w-52 bg-white h-20 flex justify-center items-center mb-12">
                <h1 className="text-heading-h1 font-oswald uppercase" >Logo</h1>
            </div>
            <form action="" className="flex flex-col gap-5 w-[400px]">
                <input type="text" className="h-12 rounded text-center" placeholder="Juanito 123" />
                <input type="text" className="h-12 rounded text-center" placeholder="******" />
                <button type="submit" className=" text-button-primary font-nunitoSans bg-primary-action-blue text-text-light-gray h-11 rounded mt-2">Login</button>
            </form>
        </section>
    );
}

export default LoginPage;