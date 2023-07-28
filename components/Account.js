import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link'; // Import the Link component from Next.js
import { useRouter } from 'next/router'; // Import the useRouter hook


export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getCurrentUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session?.user) {
      throw new Error('User not logged in');
    }

    return session.user;
  }

  async function getProfile() {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      } else {
        // If the update was successful, navigate to the "shows" page
        router.push('/shows'); // Use router.push() for navigation
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const router = useRouter(); // Get the router object using useRouter()

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h5" align="center" gutterBottom>
          Account Settings
        </Typography>
        <form>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            value={session.user.email}
            disabled
            margin="normal"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Website"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            margin="normal"
          />

          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateProfile({ username, website, avatar_url })}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update'}
            </Button>
          </Box>
          <Link href="/shows">
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </Button>
          </Box>
          </Link>
        </form>
      </Box>
    </Container>
  );
}
