import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Typography,
} from '@mui/material'

export default function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ricktastic
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </Box>
  )
}
