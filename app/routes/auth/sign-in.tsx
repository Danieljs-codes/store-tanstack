import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth-layout-id/sign-in')({
  component: () => <div>Hello /_auth-layout-id/sign-in!</div>,
})
