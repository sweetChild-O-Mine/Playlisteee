import {useState} from 'react'

export const PlaylistGenerator = () => {

    // state for prompt
    const [prompt, setPrompt] = useState("")
    const [playlist, setPlaylist] = useState(null)
    // to store songs data
    const [previewData, setPreviewData] = useState(null)    
    const [isLoading, setIsLoading] = useState(false)     //loading state for animation

    // handler for form submmison 
    const handleSubmit = (e) => {
      e.preventDefault()

    const token = localStorage.getItem('spotify_access_token')

    if(!token) {
      console.error("NO token found!! please login first!!.")
      return
    }

    // submit pr click hote hi bande ko laoding dikhayenge hum 
    setIsLoading(true)

      // fetch call for api/generate
      fetch('/api/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt, token: token })
      })
      .then(response => response.json())    //backend se data bhi aayega nah toh
      .then(data => {
        console.log('Got the data yayyy!!!', data)
        setPreviewData(data) 
        // stop the loading and show him the fucking data nigg
        setIsLoading(false)
      })
      .catch(error => {
        console.error("error fetching data", error)
        setIsLoading(false)
      })
    }

    // fucntion to add the generated playlist to spotify 
    const handleAddToSpotify = () => {
      if(!previewData) return

      const token = localStorage.getItem('spotify_access_token')

      // start the loading coz abhi toh important kaam start ho rha hai 
      setIsLoading(true)

      // extract the uri from the data 
      const validUris = previewData.songs 
      // arr me jao then eacch element which is an object ke andar jao and found se pata karo ki song mila bhi hai yah sirf bakchodi horhi hai 
        .filter((song) => song.found )
        // ab agarmil gya hai toh finally song se uri nikal lo bc 
        .map(song => song.uri)

      // call the endpoint ki playlist banani hai for these uri 
      fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // send the body mfk 
        body: JSON.stringify({
          playlistName: previewData.playlistName,
          validUris: validUris,
          token: token
        })
      })
      .then(response => response.json() )
      .then(data => {
        console.log('Playlist created: ', data)
        setPlaylist(data)
        setIsLoading(false)
        alert("Playlist added to Spotify!!! now dance basanti")
      })
      .catch(error => {
        console.log('Error creatin playlist', error)
        setIsLoading(false)
      })
    }


  return (
    <div className='' >
        <form 
        className='border flex justify-center items-center mx-4 py-4 px-2 gap-x-2'
        onSubmit={handleSubmit}
        >
            <textarea 
            className='rounded-full px-4 py-0.5 text-white bg-neutral-800'
            value={prompt}
            onChange={((e) => setPrompt(e.target.value))}
            />
            <button
            disabled = {isLoading}
            className='border rounded-md px-2 py-1'
            >
              {isLoading ? "Generating...": 'Generate Playlist'}
            </button>
            <p className="">
              
            </p>
        </form>

        {/* previw sectoin :- only shhow if previewwData exist */}

          {previewData && (
            <div className="border">
              <h2>Preview: {previewData.playlistName} </h2>
              {/* show how many songs youfound  */}
              <p> Found {previewData.songs.filter(s => s.found).length} out of {previewData.songs.length} </p>

              {/* show the list of songs  */}
              <ul className="bg-blue-300">
                {previewData.songs
                  .filter(s => s.found)
                  .map((song, index) => (
                  <li key={index} >
                    {song.song} - {song.artist}
                  </li>
                ))}
              </ul>

              {/* add to spotify button */}
              <button
              onClick={handleAddToSpotify}
              disabled= {isLoading}     //click hote hi isloading ko band kro bsdk
              className="">
                {isLoading ? "Adding..." : "Add to Spotify"}

              </button>



            </div>

          )}

    </div>
  )
}
