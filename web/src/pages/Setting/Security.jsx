import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const Security = () => {
  const { handleSubmit, control, watch, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    const { currentPassword, newPassword, confirmPassword } = data;
    console.log(currentPassword);

    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }

    alert('Đổi mật khẩu thành công!');
    reset();
  };

  const newPassword = watch('newPassword'); // Theo dõi mật khẩu mới để hiển thị hoặc kiểm tra.

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '50px auto',
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2} sx={{ color: '#1976d2' }}>
        Security Dashboard
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Current Password */}
        <Controller
          name="currentPassword"
          control={control}
          defaultValue=""
          rules={{ required: 'Vui lòng nhập mật khẩu hiện tại' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* New Password */}
        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          rules={{
            required: 'Please create a new password',
            minLength: { value: 6, message: 'Mật khẩu phải ít nhất 6 ký tự' },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: 'Please confirm your new password',
            validate: (value) => value === newPassword || 'Confirm password does not match',
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="New password confirmation"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Change
        </Button>

      </form>
    </Box>
  );
};

export default Security;
