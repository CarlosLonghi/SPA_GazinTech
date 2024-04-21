import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-active={pathname === props.to}
      className="flex items-center gap-1 text-base font-medium text-muted-foreground transition hover:text-foreground data-[active=true]:text-foreground"
      {...props}
    />
  )
}
