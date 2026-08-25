import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import './Button.css'

type ButtonProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & {
    tone?: 'light' | 'outline'
}

export default function Button({ children, className = '', tone = 'light', ...props }: ButtonProps) {
    return (
        <a className={`ds-button ds-button--${tone} ${className}`.trim()} {...props}>
            {children}
        </a>
    )
}
