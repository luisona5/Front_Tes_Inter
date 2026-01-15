import {  Check, X } from 'lucide-react';


export const ValidationItem = ({ isValid, text }) => {
    return (
        <div className="flex items-center gap-2">
            <div className={isValid ? 
                "rounded-full p-0.5 transition-colors duration-200 bg-green-500" : 
                "rounded-full p-0.5 transition-colors duration-200 bg-red-500"
            }>
                {isValid ? (
                    <Check className="text-white" size={14} aria-hidden="true" />
                ) : (
                    <X className="text-white" size={14} aria-hidden="true" />
                )}
            </div>
            <span className={isValid ? 
                "text-sm transition-colors duration-200 text-green-700 font-medium" : 
                "text-sm transition-colors duration-200 text-gray-600"
            }>
                {text}
            </span>
        </div>
    );
};