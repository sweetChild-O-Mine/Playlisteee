import React, { useRef, useEffect } from 'react'

export const Callback = () => {

  // get the link first
  const urlParams = new URLSearchParams(window.location.search) 
  // extract code from the link
  const code = urlParams.get('code')
  console.log(code)
  const hasRun = useRef(false)

  useEffect(() => {
    if(code && !hasRun.current) {
      hasRun.current = true
      fetch('/api/callback', {
        method: "POST",
        // standar header to tell the backend that the data which iam sending is in json format
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code})
      })
      // now backend will snedd the response THE GREAT ACESS TOKEN 
      .then((response) => response.json())      //yeh string hai so we gotta convert this mfk into js object
      .then(data => {
        console.log(`Access Token received: `, data) //this is that THE GREAT ACESS TOKEN jiske liye humne itni ramayan kari

        // using local storage now but we'll use contextAPI later
        localStorage.setItem('spotify_access_token', data.access_token)
        localStorage.setItem('spotify_refresh_token', data.refresh_token)

        // redirect to home page for now 
        window.location.href = '/'

      })
      .catch(error => console.log('Error', error))
    }



  },[code])

  return (
    <div>
        hi
    </div>
  )
}
