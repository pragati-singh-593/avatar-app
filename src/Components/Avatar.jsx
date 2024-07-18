import React, { useState } from 'react'; 
import '../Styles/Avatar.css'; 
import Axios from 'axios'; 
  
const Avatar = () => { 
    // Setting up the initial states using react hook 'useState' 
    const [sprite, setSprite] = useState("bottts"); 
    const [seed, setSeed] = useState(1000); 
    const [error, setError] = useState(null); // State to handle errors
      
    // Function to set the current sprite type 
    function handleSprite(spritetype) { 
        setSprite(spritetype); 
    } 
      
    // Function to generate random seeds for the API 
    function handleGenerate() { 
        let x = Math.floor(Math.random() * 1000); 
        setSeed(x); 
    } 
      
    // Function to download image and save it in our computer 
    function downloadImage() { 
        Axios({ 
            method: "get", 
            url: `https://api.dicebear.com/9.x/${sprite}/svg`, 
            responseType: "arraybuffer"
        }) 
        .then((response) => { 
            var link = document.createElement("a"); 
            link.href = window.URL.createObjectURL( 
                new Blob([response.data],  
                { type: "image/svg+xml" }) 
            ); 
            link.download = `${seed}.svg`; 
            document.body.appendChild(link); 
            link.click(); 
            setTimeout(function () { 
                document.body.removeChild(link); 
                window.URL.revokeObjectURL(link.href); 
            }, 200); 
        }) 
        .catch((error) => { 
            setError("Failed to download image."); // Set error state
            console.error("Error downloading image:", error);
        }); 
    } 
  
    return ( 
        <div className="container"> 
            <div className="nav"> 
                <p>Random Avatar Generator</p> 
            </div> 
            <div className="home"> 
                <div className="btns"> 
                    <button onClick={() => handleSprite("avataaars")}>Human</button> 
                    <button onClick={() => handleSprite("pixel-art")}>Pixel</button> 
                    <button onClick={() => handleSprite("bottts")}>Bots</button> 
                    <button onClick={() => handleSprite("identicon")}>Geometric</button> 
                    <button onClick={() => handleSprite("notionists-neutral")}>Face</button> 
                    <button onClick={() => handleSprite("rings")}>Rings</button> 
                    <button onClick={() => handleSprite("micah")}>Avatars</button> 
                </div> 
                <div className="avatar"> 
                    {error ? ( 
                        <p>{error}</p> // Display error message
                    ) : ( 
                        <img src={`https://api.dicebear.com/9.x/${sprite}/svg`} alt="Sprite" /> 
                    )} 
                </div> 
                <div className="generate"> 
                    <button id="gen" onClick={handleGenerate}>Next</button> 
                    <button id="down" onClick={downloadImage}>Download</button> 
                </div> 
            </div> 
        </div> 
    ); 
} 
  
export default Avatar;
