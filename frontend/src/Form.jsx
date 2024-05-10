import { InputAdornment, IconButton, Box, TextField, Fab } from "@mui/material";
import HiveRoundedIcon from '@mui/icons-material/HiveRounded';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import TokenRoundedIcon from '@mui/icons-material/TokenRounded';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import "./Form.css";


// export default function Form(props) {
export default function Form({ handleButtonClick, backgroundColor, handleSubmit, reply, text, handleChange, myText, translatedText }) {

    return (
        <>
            <form onSubmit={handleSubmit}>           
                <div className="background-container" style={{ background: backgroundColor }}>

                <div className="text-container">
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '70ch', },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField fullWidth
                            id="filled-multiline-static"
                            label="Text"
                            multiline
                            value={myText}
                            rows={6}
                            // defaultValue="Default Value"
                            variant="filled"
                        />
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '70ch', }, 
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField fullWidth
                            id="filled-multiline-static"
                            label="Translation"
                            multiline
                            value={translatedText}
                            rows={6}
                            // defaultValue="Default Value"
                            variant="filled"
                        />
                    </Box>
                </div>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: 'column',
                            padding: "50px",
                            width: '100%',
                            height: '30vh', 
                            m: 3,
                        }}
                    >
                        <TextField fullWidth sx={{ m: 1 }}
                            id="outlined-basic" 
                            label="write sentence" 
                            variant="outlined" 
                            onChange={handleChange}
                            value={text}
                            color="tertiary"
                            InputProps = {{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        type="submit"
                                    >
                                    <DoubleArrowRoundedIcon />
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                        
                        
                        <Box 
                            sx={{ '& > :not(style)': { m: 1 }, margin:"10px"}}
                        >
                            <Fab variant="extended" onClick={() => handleButtonClick("ML")} color="secondary">
                                <HiveRoundedIcon sx={{ mr: 1 }} color="primary"/>
                                ML
                            </Fab>
                            <Fab variant="extended" onClick={() => handleButtonClick("Bert")} color="secondary">
                                <GraphicEqRoundedIcon sx={{ mr: 1 }} color="primary"/>
                                Bert
                            </Fab>
                            <Fab variant="extended" onClick={() => handleButtonClick("DL")} color="secondary">
                                <TokenRoundedIcon sx={{ mr: 1 }} color="primary"/>
                                DL
                            </Fab>
                            <div className="sentiment">{reply}</div>
                        </Box>
                    </Box>
                </div>
            </form>
        </>
    );
}