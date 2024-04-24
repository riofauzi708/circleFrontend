import react from '@vitejs/plugin-react'

export default {
  plugins: [
    react({
      include: [/\.jsx?$/, /\.tsx?$/],
    }),
  ],
}