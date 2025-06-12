import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  Button,
  Box,
  Typography,
} from '@mui/material';

import avatar1 from 'assets/imgs/avatar/avatar1.png';
import avatar2 from 'assets/imgs/avatar/avatar2.png';
import avatar3 from 'assets/imgs/avatar/avatar3.png';
import avatar4 from 'assets/imgs/avatar/avatar4.png';

const avatarOptions = [
  { id: 'avatar1.png', src: avatar1 },
  { id: 'avatar2.png', src: avatar2 },
  { id: 'avatar3.png', src: avatar3 },
  { id: 'avatar4.png', src: avatar4 },
];

const AvatarSelectorModal = ({ open, onClose, onSave, currentAvatar }) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);

  useEffect(() => {
    const isValid = avatarOptions.some((avatar) => avatar.id === currentAvatar);
    setSelectedAvatarId(isValid ? currentAvatar : null);
  }, [currentAvatar]);

  const handleSave = () => {
    if (selectedAvatarId) {
      onSave(selectedAvatarId);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h6" align="center">
          Selecciona tu foto de perfil
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {avatarOptions.map((avatar) => (
            <Grid item xs={6} key={avatar.id}>
              <Box
                onClick={() => setSelectedAvatarId(avatar.id)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src={avatar.src}
                  alt={avatar.id}
                  sx={{
                    width: 72,
                    height: 72,
                    border: selectedAvatarId === avatar.id
                      ? '3px solid #1976d2'
                      : '3px solid transparent',
                    borderRadius: '50%',
                    transition: '0.2s',
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        {!selectedAvatarId && (
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            mt={2}
          >
            Actualmente estás usando una imagen que no está en la lista.
            Selecciona una nueva para actualizarla.
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!selectedAvatarId || selectedAvatarId === currentAvatar}
        >
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvatarSelectorModal;