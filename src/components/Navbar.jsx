


export const Navbar = () => {
  return (
    <nav className="relative z-10  max-w-4xl mx-auto pt-2 px-2 ">
        {/* container div for the children */}
        <div className=" border-b-0  border-neutral-500 text-neutral-200 font-mono rounded-full flex justify-between items-center px-6 py-3">
            {/* first logo  */}
            <div className="font-semitb  font-mono text-lg ">
                Playlisteee
            </div>

            {/* div for link maybe  */}
            <div className="flex justify-center items-center gap-x-4 ">
                
                <a 
                    target="_blank"
                    href="https://github.com/sweetChild-O-Mine" className="">
                    Github
                </a>

                <a href="https://twitter.com/sudo_Slash" className="">
                    Twitter
                </a>


                
            </div>

        </div>
    </nav>
  )
}

