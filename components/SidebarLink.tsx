import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
    href: string;
    children: React.ReactNode;
    isSelected?: boolean;
}

/*

Usage examples:

<SidebarLink href="#" isSelected>
  Products
</SidebarLink>

<SidebarLink href="#">
  Customers
</SidebarLink>
*/

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, children, isSelected = false }) => {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center rounded-lg px-3 py-2 transition-all hover:text-primary",
                isSelected
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
            )}
        >
            {children}
        </Link>
    );
};

export default SidebarLink;
