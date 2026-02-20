export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bb-dark bg-noise p-4 relative overflow-hidden">
      {/* Elementos geométricos decorativos Mid-Century */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-bb-highlight rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-bb-impact rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
