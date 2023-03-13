import * as React from 'react'
import { Chip, Stack, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

export default function IconChips() {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <Typography>
        <Chip
          icon={<GitHubIcon />}
          label="Core"
          clickable
          component="a"
          href="https://github.com/kensyo/3NF_SYNTHESIS"
        />
      </Typography>
    </Stack>
  )
}
