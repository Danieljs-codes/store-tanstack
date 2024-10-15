import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
      <div>
        <p className={"text-sm"}>This is the home pagee</p>
      </div>
  )
}