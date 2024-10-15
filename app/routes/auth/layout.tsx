import { Logo } from '@/components/logo'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { zodSearchValidator } from '@tanstack/router-zod-adapter'
import { z } from 'zod'

const callbackURLSchema = z.object({
  callbackURL: z.string().optional(),
})

export const Route = createFileRoute('/_auth-layout-id')({
  validateSearch: zodSearchValidator(callbackURLSchema),
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div>
      <div className="h-full flex flex-col items-center pt-12 md:pt-24 px-4">
        <Link to="/">
          <Logo classNames={{ container: 'mb-6', icon: 'h-10 w-auto' }} />
        </Link>
        <div className="w-full max-w-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default AuthLayout
