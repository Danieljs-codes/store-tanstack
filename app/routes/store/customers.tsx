import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/$storeId/dashboard/customers')({
  component: () => <div>Hello /store/$storeId/dashboard/customers!</div>,
})
