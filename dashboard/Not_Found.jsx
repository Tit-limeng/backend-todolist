import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 Header */}
        <div className="mb-8">
          <div className="inline-block">
            <h1 className="text-9xl md:text-[120px] font-black text-transparent bg-clip-text bg-linear-to-r from-primary to-accent leading-none animate-pulse">
              404
            </h1>
          </div>
        </div>

        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="text-6xl">🧭</div>
        </div>

        {/* Friendly Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Looks like you got lost in the task jungle!
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist, but don&apos;t worry—your tasks are waiting for you back home.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/auth/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-muted transition-colors"
          >
            Go to Login
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Need help?</p>
          <a
            href="mailto:support@taskflow.app"
            className="inline-block text-primary hover:text-accent transition-colors font-medium text-sm"
          >
            Contact Support →
          </a>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 space-y-2 text-xs text-muted-foreground/50">
          <p>Error Code: 404 | Page Not Found</p>
          <p>Return to safety with your tasks</p>
        </div>
      </div>
    </main>
  )
}
