interface PanelHeaderProps {
  title: string
  description: string
}

export function PanelHeader({ title, description }: PanelHeaderProps) {
  return (
    <div className="border-b border-[#3e3e42] bg-[#2d2d30] px-6 py-6">
      <h1 className="text-2xl font-bold text-[#cccccc]">{title}</h1>
      <p className="text-sm text-[#858585] mt-1">{description}</p>
    </div>
  )
}