import { Box, Toolbar, Typography, AppBar } from '@mui/material';
import HdrStrongRoundedIcon from '@mui/icons-material/HdrStrongRounded';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
      primary: {
        main: '#546e7a',
      },
      secondary: {
        main: '#b0bec5',
      },
      tertiary: {
        main: '#c1c170',
      },
    },
});

export default function Navbar( { colorCode }) {
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color={colorCode}>
          <Toolbar variant="dense">
            <HdrStrongRoundedIcon edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <BookmarkIcon />
            </HdrStrongRoundedIcon>
            <Typography variant="h6" color="inherit" component="div">
              MultiLingual Sentiment Analysis
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}