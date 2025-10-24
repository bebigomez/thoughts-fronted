import { useState, useEffect } from 'react';
import thoughts from '../services/thoughts';

export const usePost = (id, initialPost = null) => {
  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialPost && id) {
      setLoading(true);
      setError(null);
      
      thoughts.getOne(id)
        .then((data) => {
          setPost(data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, initialPost]);

  return { post, loading, error };
};