import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
	'flex w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default: `bg-gray-200`,
				search: `bg-white`,
				primary: 'bg-primary text-primary-foreground',
				secondary: 'bg-secondary text-secondary-foreground',
				accent: 'bg-accent text-accent-foreground',
			},
			inputSize: {
				default: 'h-10',
				sm: 'h-8 text-sm px-2',
				lg: 'h-12 text-lg px-4',
			},
		},
		defaultVariants: {
			variant: 'default',
			inputSize: 'default',
		},
	}
);

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	inputSize?: 'default' | 'sm' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, inputSize, ...props }, ref) => {
		return (
			<input
				className={cn(inputVariants({ variant, inputSize, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);

Input.displayName = 'Input';

export { Input, inputVariants };
