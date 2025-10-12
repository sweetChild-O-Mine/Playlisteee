import { useState, useEffect } from "react"
import { PlaylistGenerator } from "./components/PlaylistGenerator"
import { Navbar } from "./components/Navbar"

function App() {

  const [token, setToken] = useState(null)
  const [profile, setProfile] = useState(null)

  // useEffect for our fetch  request and a ll 
  useEffect(() => {

    const accessToken = localStorage.getItem('spotify_access_token')

    if(accessToken) {
      setToken(accessToken)
    }


  },[])

  useEffect(() => {

    if(token != null) {
      testSpotifyAPI()
      console.log('testSpotifyApi executed')
    }

  },[token])
  

    // our fetch fucntion and use this token to get user details 
    const testSpotifyAPI = async () => {
      // makefetch req
      fetch('https://api.spotify.com/v1/me', {
        // type of post 
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      })
      .then((response) => {
        if(!response.ok) {    //read it like response ok nhi hai kya ???
          throw new Error(`HTTP error! status ${response.status} `)
        }

        // return the final reponse
        return response.json()  //response milega from spotify so convert krao usko and we'll use that thing
      })
      .then(data => {
        console.log('Success yayyy!!!', data)
        setProfile(data)
      })
      .catch(error => {
        console.error('Error fetching data', error)
      })
    }




  const handleLogin = () => {

    /* 
    https://accounts.spotify.com/authorize?
    client_id=YOUR_CLIENT_ID&
    response_type=code&
    redirect_uri=YOUR_REDIRECT_URI&
    scope=PERMISSIONS_YOU_NEED
    */

    // client id lao 
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID

    // response_type
    const response_type = "code"

    // redirectUrl :- where spotify sends user back to your app after getting the things
    const redirect_url = 'http://127.0.0.1:3000/callback'

    // we gonna use ip address for localhost form now as thats the need of the hour nigga


    // scope :- what are the permission you arer askng for
    // for creatng
    const scope = "playlist-modify-public playlist-modify-private"

    const baseUrl = "https://accounts.spotify.com/authorize"

    // approach one is 
    // let authUrl = baseUrl + "?" + "client_id=" + clientId +"&" + "response_type=" + response_type + "&" + "redirect_url=" + redirect_url + "&" + "scope=" + scope 

    // approach 2 more cleaner 
    // also use endocdeURIComponent for cnverting space and all into actual needed things 
    const authUrl = `${baseUrl}?client_id=${clientId}&response_type=${response_type}&redirect_uri=${encodeURIComponent(redirect_url)}&scope=${encodeURIComponent(scope)}  `
    
    // redirecting browser to our authUrl 
    window.location.replace(authUrl)

    console.log(authUrl)

  }

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token')

    // make the states null
    setToken(null)
    setProfile(null)
  }


return (

<div className="min-h-screen w-full relative bg-black">
    {/* Emerald Depths Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}

    <Navbar />


           {/* main container  */}
      <div className="relative  max-w-6xl  min-h-screen flex flex-col gap-4 border mx-auto">

        <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/21 h-32 bg-gradient-to-r from-transparent via-green-600/40 to-transparent blur-3xl"/>

      {!token ? (

        // treating this as a whole compo.
        // div container for these things
        <div className=" max-w-6xl mt-20 flex flex-col items-center gap-6 mx-auto p-4 border-white ">

          {/* div for heading  */}
          <div className=" border-neutral-300 font-mono mb-10 text-neutral-400 ">
            <h1 className="text-6xl text-center ">
              Let AI handle <br /> your,<span className="text-neutral-800">Playlists</span>
            </h1>
          </div>

          {/* contaier for the BOX parts of the design */}
          <div className=" w-full bg-gradient-to-b from-black/10 to-red-950/40 backdrop-blur-lg gap-10 rounded-3xl text-neutral-200 flex flex-col items-center px-6 py-4 ">
            <p className="text-center mt-10 ">
                    Let AI create the perfect playlist for any mood <br /> 
      Just describe it here what you  <br /> in the prompt what want 
            </p>

            <div className=" py-4 px-4 flex gap-4">
              {/* first button  */}
              <button className="px-4 py-1 rounded-2xl text-md  bg-neutral-900 text-neutral-300 "
              onClick={handleLogin}
              >
                Get Started
              </button>
              <button className="px-4 py-1 rounded-2xl text-sm   bg-neutral-300 text-neutral-950 ">
                Watch Video
              </button>
            </div>

            <div className="w-full border-t border-neutral-400" />

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 ">
              <div className=""></div>
              <div className=""></div>
            </div>

          </div>



        </div>

      ) : (
        <div className="border bg-blue-400 flex justify-center items-center flex-col gap-3 py-4">
          <h1 className="">Welcome !!!</h1>
          {/* if porfile exist then do this else that  */}
          {profile && <p>{`Logged in as ${profile.display_name}`}</p> }
          <PlaylistGenerator />
          <button
          onClick={handleLogout}
          >Logout</button>
        </div>
      )}

      </div>
  </div>





  )
}

export default App


