import React from 'react'
import { Link } from 'react-router-dom'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Crumb = { label: string; path?: string }

type Props = {
  title: string
  description?: string
  breadcrumbs?: Crumb[]
  action?: React.ReactNode
  children: React.ReactNode
}

/**
 * Standard page wrapper — matches the PMS shell pattern:
 * breadcrumb → uppercase h1 → optional description → content.
 * Pages get `p-4 md:p-6` padding automatically.
 */
export function PageShell({ title, description, breadcrumbs, action, children }: Props) {
  const crumbs: Crumb[] = breadcrumbs ?? [{ label: 'Home', path: '/home' }, { label: title }]

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {crumb.path ? (
                      <BreadcrumbLink render={<Link to={crumb.path} />}>
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="mt-3 font-heading text-lg font-normal uppercase tracking-wide">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      {/* Page content */}
      {children}
    </div>
  )
}
