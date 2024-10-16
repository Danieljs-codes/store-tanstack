import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/$storeId/dashboard/')({
  component: () => <div>Hello /store/$storeId/dashboard/!</div>,
})
