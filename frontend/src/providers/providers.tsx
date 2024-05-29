import { ModalProvider } from './modal-provider';
import { ThemeProvider } from './theme-provider';
import ToastProvider from './toast-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <ToastProvider>
        <ModalProvider>{children}</ModalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
