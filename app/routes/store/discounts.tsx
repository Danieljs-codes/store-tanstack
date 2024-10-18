import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/$storeId/dashboard/discounts')({
  component: () => <div>Hello /store/$storeId/dashboard/discounts!</div>,
})
