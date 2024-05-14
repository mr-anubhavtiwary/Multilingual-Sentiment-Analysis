//npm run dev
import CssBaseLine from "@mui/material/CssBaseline";
import { useState } from "react";
import Navbar from "./Navbar";
import Start from "./Start";
import axios from "axios";
import './App.css'

function App() {
  const [backgroundColor, setBackgroundColor] = useState('linear-gradient(to top, #645b6f 0%, #acd7c3 100%)'); // Default background color
  const [color, setColor] = useState("primary");
  const [reply, setReply] = useState(null);
  const [text, setText] = useState("");
  const [model, setModel] = useState("");
  const [myText, setMyText] = useState("");
  const [translatedText, setTranslatedText] = useState("");


  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();
    console.log('Form submitted with value:', text);
    
    setMyText(text);
    // const response = await axios.post("http://localhost:3000/api/text",{text});
    const response = await axios.post("https://msa-backend.vercel.app/api/text",{text});
    // https://msa-backend.vercel.app/
    // console.log('Response from Flask:', response.data);
    setTranslatedText(response.data.translatedText);
    setModel(response.data);
    setText("");
    setReply("")
  };

  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} clicked`);
    
    switch (buttonName) {
        case "ML":
            setBackgroundColor('linear-gradient(to right, #243949 0%, #517fa4 100%)');
            setColor("primary");
            // console.log(model.ml);
            setReply("ML : " + model.ml);
            break;
        case "Bert":
            setBackgroundColor('linear-gradient(to right, #a8caba 0%, #5d4157 100%)');
            setColor("secondary");
            // console.log(model.dl);
            setReply("BERT : " + model.bert);
            break;
        case "DL":
            setBackgroundColor('linear-gradient(to top, #f4a259 0%, #8cb369 100%)');
            setColor("tertiary");
            // console.log(model.bert);
            setReply("DL : " + model.dl);
            break;
        default:
            setBackgroundColor('linear-gradient(to top, #330867 0%, #30cfd0 100%)');
            break;
    }
};
  return (
    <>
      <CssBaseLine />
      <Navbar colorCode={color} />
      <Start 
        handleButtonClick={handleButtonClick} 
        backgroundColor={backgroundColor} 
        handleSubmit={handleSubmit} 
        reply={reply} 
        text={text} 
        handleChange={handleChange} 
        myText={myText} 
        translatedText={translatedText}
      />
    </>
  )
}

export default App
