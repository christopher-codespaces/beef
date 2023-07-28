import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Heart icon
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Empty heart icon
import Rating from '@mui/material/Rating';
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';


export default function MediaControlCard() {
  
  const theme = useTheme();
  const [podcasts, setPodcasts] = useState([]); // State to store the fetched podcasts
  const [favoritePodcastIds, setFavoritePodcastIds] = useState([]); // State to store favorite podcast IDs

  useEffect(() => {
    // Fetch the podcasts from the API
    fetch('https://podcast-api.netlify.app/')
      .then((response) => response.json())
      .then((data) => setPodcasts(data))
      .catch((error) => console.error('Error fetching podcasts:', error));

    // Fetch user's favorite podcast IDs from Supabase
    const fetchFavorites = async () => {
      const { data, error } = await supabase.from('favorites').select('podcast_id');
      if (error) {
        console.error('Error fetching favorite podcasts:', error);
      } else {
        // Extract the podcast IDs from the response and store them in state
        const favoriteIds = data.map((row) => row.podcast_id);
        setFavoritePodcastIds(favoriteIds);
      }
    };

    fetchFavorites();
  }, []);

    // Initialize Supabase client with your Supabase URL and API Key
    const supabaseUrl = "https://mtrinscfwajetohklhso.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cmluc2Nmd2FqZXRvaGtsaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1NDc3NDQsImV4cCI6MjAwNjEyMzc0NH0.6V7p3V4OuIHHmQvdnDdivqGcDcsSY6zCwNZCZS2P1nw";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const toggleFavorite = async (podcast) => {
      const podcastId = podcast.id;
      const podcastName = podcast.title;
  
      if (favoritePodcastIds.includes(podcastId)) {
        // If the podcast is already in favorites, remove it
        setFavoritePodcastIds((prevIds) => prevIds.filter((id) => id !== podcastId));
  
        // Remove the favorite podcast from the Supabase table
        await supabase
          .from('favorites')
          .delete()
          .eq('podcast_id', podcastId);
      } else {
        // If the podcast is not in favorites, add it
        setFavoritePodcastIds((prevIds) => [...prevIds, podcastId]);
  
        // Add the favorite h podcast to the Supabase table
        await supabase
          .from('favorites')
          .insert([{ podcast_id: podcastId, podcast_name: podcastName }]);
      }
    };
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
      {podcasts.map((podcast) => (
        <Card key={podcast.id} sx={{ width: 'calc(50% - 8px)', marginBottom: 16 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography component="div" variant="h5">
                {podcast.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {podcast.artist}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div">
                Seasons: {podcast.seasons}
              </Typography>

            </CardContent>
            <IconButton
              aria-label="favorite"
              onClick={() => toggleFavorite(podcast)} // Pass the podcast object to toggleFavorite
              color={favoritePodcastIds.includes(podcast.id) ? 'error' : 'default'}
            >
              {favoritePodcastIds.includes(podcast.id) ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
          <Link key={podcast.id} href={`/podcast/${podcast.id}`} passHref>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: 200, objectFit: 'cover' }}
            image={podcast.image} // Assuming the podcast object has an 'image' property with the URL to the image
            alt={`Cover for ${podcast.title}`}
          />
          </Link>

        </Card>
      ))}

    </Box>
  );
}
