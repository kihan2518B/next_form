export const Alert = ({ children, className }: any) => (
    <div className={`p-4 rounded-md border ${className}`}>{children}</div>
);

export const AlertTitle = ({ children }: any) => (
    <h4 className="font-bold">{children}</h4>
);

export const AlertDescription = ({ children }: any) => (
    <p>{children}</p>
);
