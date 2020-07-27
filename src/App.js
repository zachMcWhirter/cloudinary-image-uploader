import React, { useState } from 'react';

import './App.css';

function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState("")

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "testImages")
    setIsLoading(true);

    const res = await fetch("https://api.cloudinary.com/v1_1/lordargyle22/image/upload", {
      method: "POST",
      body: data,

    })

    const file = await res.json()

    console.log(file)

    setImage(file.secure_url)
    setIsLoading(false)

  }

  return (
  <div>
    <h2 className="App">
      Upload Image To Cloudinary In React
    </h2>
    <input type="file" name="file" placeholder="Upload an Image" onChange={uploadImage}/>

    {
      isLoading?(
        <h3>
          Loading ...
        </h3>
      ):(
        <img src={image} style={{width:"500px"}} />
      )
    }

  </div>
  )
}

export default App;
