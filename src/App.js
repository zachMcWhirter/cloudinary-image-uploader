import React, { useState } from 'react';

import './App.css';

function App() {

  // setting state for loading as false
  const [isLoading, setIsLoading] = useState(false);
  // setting state for image as empty string
  const [image, setImage] = useState("");


  const uploadImage = async e => {
    const files = e.target.files;

    // new FormData is an easy way of creating a constructor that makes key/value pairs
    const data = new FormData()
    // append is a built in method that you can use in combination with new FormData
    data.append("file", files[0])
    data.append("upload_preset", "testImages");
    setIsLoading(true);

    // This is a fetch call that posts the uploaded image to a pre-built folder in a Cloudinary Account
    const res = await fetch("https://api.cloudinary.com/v1_1/lordargyle22/image/upload", {
      method: "POST",
      body: data
    });
    // waiting for a response from json
    const file = await res.json();

    // When you console.log (file), you will be able to see the properties and values of the image. The property we are looking to capture is "secure_url".
    console.log(file);

    // Now we use dot notation to access the secure_url property
    setImage(file.secure_url);
    setIsLoading(false);

  }

  return (
  <div>
    <h2 className="App">
      Upload Image To Cloudinary In React
    </h2>
    {/* Creating the input form and calling the uploadImage function onChange */}
    <input type="file" name="file" placeholder="Upload an Image" onChange={uploadImage}/>

    {
      // This is essentially an if/else statement written inside the return using the "?" as the if, and ":" as the else. This code reads: "if isLoading=true, then return Loading ...", "else return <img src={image} style={{width:"500px"}} /> "
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
