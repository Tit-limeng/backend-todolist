import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { api, userData } from '../../config/api/api'
// import { useAdmin } from '../admin-context'
import  LoadingBar  from 'react-top-loading-bar'

export default function AdminLoginPage() {
  //   const router = useNavigate()
  //   const { login } = useAdmin()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [data, setData] = useState([]);
  const loadingBarRef = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false);




    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
        if (error[name]) {
            setError(prev => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }
  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setError(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    loadingBarRef.current?.continuousStart();
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('[v0] Login successful:', formData.email);
      setError({ submit: 'Login successful! Redirecting...' });
      await api.post('/admin/login', formData, {
        withCredentials: true,
      });
      getData();
      // const user = await userData();
      // console.log('User data fetched:', user);
      // setData(user);
      // console.log('Login response:', login.data);
      navigate('/');
    } catch (error) {
      setError({
        submit: 'Login failed. Please try again.',
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
      loadingBarRef.current?.complete();
    }



    // try {
    //   const success = await login(username, password)
    //   if (success) {
    //     router.push('/admin')
    //   } else {
    //     setError('Invalid username or password. Try admin/admin123')
    //   }
    // } catch (err) {
    //   setError('An error occurred. Please try again.',err)
    // } finally {
    //   setIsLoading(false)
    // }
  }
  const getData = async () => {
    try {
      const user = await userData();
      setData(user);
      // console.log('Data fetched:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
     <LoadingBar
        color="#6fc276"
        ref={loadingBarRef}
        height={4}
        shadow={true}
      />
    <div className="min-h-screen bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Admin Panel Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Access the dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
                  {error.submit && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 text-sm">
            {error.submit}
          </div>
        )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin"
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Demo Credentials Info */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Username: admin
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Password: admin123
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login to Admin Panel'
              )}
            </button>
          </form>

          {/* Back to App */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            <Link
              href="/"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Back to app
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
