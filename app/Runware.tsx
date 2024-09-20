"use client"
import {useState} from 'react';
import "./globals.css";
import {IImage,Runware} from "@runware/sdk-js";

//Input your RUNWARE API KEY HERE.
const API_KEY = "";


const runware = new Runware({ apiKey: API_KEY });

export const RunwareExample = () => {
    const [images, setImages] = useState<IImage[]>([]);
  
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
  
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        await runware.requestImages({
          numberResults: 4,
          positivePrompt: searchInput,
          // positivePrompt:
          //   "masterpiece, high quality, best quality, portrait man with blue eyes and brown hair, kawaii, 8k, cartoon, simple background, 8k, high quality, style by Pixar animated studio, Disney, full body, chibi -no owres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
          model: "runware:100@1",
          width: 512,
          height: 512,
          onPartialImages(images: IImage[]) {
            console.log("images", images);
            setImages((prev) => [...prev, ...(images ?? [])]);
          },
        });
      } catch (e) {
        console.log("error", e);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="App">
        <h1>Welcome to RUnware Demo</h1>
        <h3>Add your api keys to generate image</h3>
        <div className="input-wrapper">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter search here..."
          />
          <button
            className="sdk-button"
            onClick={fetchImages}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Images"}
          </button>
        </div>
        <div className="image-container">
          {images.map((img) => (
            <div key={img.imageUUID}>
              <img
                height={200}
                width={200}
                src={img.imageURL}
                alt={img.imageURL}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  