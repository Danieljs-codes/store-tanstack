import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/$storeId/dashboard/products/new')({
  component: () => <div>Hello /store/$storeId/dashboard/products/new!</div>,
})
