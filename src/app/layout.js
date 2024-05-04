import NextTopLoader from "nextjs-toploader";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/css/main.css'
import '@/assets/css/animate.min.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      {children}
      <NextTopLoader/>
      <Toaster />
      </body>
    </html>
  );
}
