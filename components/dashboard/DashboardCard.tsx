import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface DashboardCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

const variantStyles = {
  default: 'bg-white border-gray-200',
  primary: 'bg-blue-50 border-blue-200',
  success: 'bg-green-50 border-green-200',
  warning: 'bg-yellow-50 border-yellow-200',
  danger: 'bg-red-50 border-red-200'
}

const iconStyles = {
  default: 'bg-gray-100 text-gray-600',
  primary: 'bg-blue-100 text-blue-600',
  success: 'bg-green-100 text-green-600',
  warning: 'bg-yellow-100 text-yellow-600',
  danger: 'bg-red-100 text-red-600'
}

export function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className
}: DashboardCardProps) {
  return (
    <div className={cn(
      "rounded-xl border p-6 shadow-sm transition-all hover:shadow-md",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-sm font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-gray-400 font-normal">vs kemarin</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "rounded-xl p-3",
            iconStyles[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  )
}
