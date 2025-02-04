import { useState } from 'react'
import './App.css'
import { Container, FormControl, MenuItem, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';


function App() {
const [emailContent, setEmailContent] = useState('');
const [tone, setTone] = useState('');
const [generatedReply, setGeneratedReply] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async () => {
  setLoading(true);
  setError('');
  setGeneratedReply('');
  try {
    const response = await axios.post('http://localhost:8081/api/email/generate',{
    emailContent,
    tone,
    });
    setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
  } catch (error) {
    setError('Something went wrong. Please try again later.');
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
    <Container maxWidth="md" sx={{py:4}}>
    <Typography variant='h3' component="h1" gutterBottom align='center'>
      Email Reply Generator
    </Typography>
    <Box sx={{ mx: 3 }}>
    <TextField
    fullWidth
    multiline
    rows={6}
    variant='outlined'
    label='Email Content'
    value={emailContent || ''}
    onChange={(e) => setEmailContent(e.target.value)}
    sx={ {mb: 2} }/>
    <FormControl fullWidth sx={{mb: 2}}>
      <InputLabel>Tone (Optional) </InputLabel>
      <Select value={tone || ''}
      label={"Tone (Optional)"}
      onChange={(e) => setTone(e.target.value)}>
        <MenuItem value="">None</MenuItem>
        <MenuItem value="formal">Formal</MenuItem>
        <MenuItem value="informal">Informal</MenuItem>
        <MenuItem value="friendly">Friendly</MenuItem>
        <MenuItem value="professional">Professional</MenuItem>

      </Select>
    </FormControl>
    <Button variant='contained' onClick={handleSubmit} disabled={!emailContent || loading} sx={{mb: 2}}>
      {loading ? 'Generating...' : 'Generate Reply'}
    </Button>
    </Box>
    {error && <Typography color='error' align='center'>{error}</Typography>}

    {generatedReply && (
      <Box sx={{mt: 4}}>
        <Typography variant='h5' component='h2' gutterBottom>
          Generated Reply
        </Typography>
        <TextField
        fullWidth
        multiline
        rows={6}
        variant='outlined'
        value={generatedReply || ''}
        inputProps={{readOnly: true}}
        />
        <Button variant='outlined'
        sx={{ mt:2 }}
        onClick={ () => navigator.clipboard.writeText(generatedReply)}>Copy to Clipboard</Button>
        </Box>
      )}
    </Container>
    </>
  )
}

export default App
