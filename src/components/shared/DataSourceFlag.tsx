import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

// Central setting to control data source flag visibility
export const SHOW_DATA_SOURCE_FLAGS = true;

interface DataSourceFlagProps {
    source: 'dummy' | 'api';
    className?: string;
}

/**
 * DataSourceFlag - Indicates whether data is from dummy data or real API
 * 
 * - source="dummy": Renders a visible "D" flag with tooltip
 * - source="api": Renders nothing (production data)
 * 
 * Usage:
 * <DataSourceFlag source="dummy" />
 * <DataSourceFlag source="api" />
 */
export const DataSourceFlag = ({ source, className = '' }: DataSourceFlagProps) => {
    // Don't render anything for API data or if flags are disabled
    if (source === 'api' || !SHOW_DATA_SOURCE_FLAGS) {
        return null;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span 
                        className={`inline-flex items-center justify-center w-5 h-5 rounded bg-primary/10 text-primary text-xs font-bold cursor-help ${className}`}
                        aria-label="Data source: Dummy data - backend integration pending"
                    >
                        D
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="text-xs">Dummy data — backend integration pending</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
