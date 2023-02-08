export default function LogIn() {
    
    const login = () => {
        
    }
    
    return(
        <div className="flex justify-center items-center h-screen">
            <form className="bg-slate-200 flex flex-col items-center justify-center gap-4 w-80 h-56 rounded">
                <input type="text" name="username" placeholder="Username" className="bg-slate-100 w-64 h-8" />
                <input type="text" name="password" placeholder="Password" className="bg-slate-100 w-64 h-8" />
                <input type="button" onClick={login} name="send" className="bg-orange-200 w-64 px-4 py-2 mt-2 rounded hover:bg-orange-100" value="Login"/>
            </form>
        </div>
    )
}