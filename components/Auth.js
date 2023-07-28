import { useState } from 'react';
import { supabase } from '../pack/supabaseClient';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Supabase + Next.js
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Sign in via magic link with your email below
        </Typography>
        <form>
          <TextField
            fullWidth
            variant="outlined"
            label="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            disabled={loading}
          >
            {loading ? 'Loading' : 'Send magic link'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
