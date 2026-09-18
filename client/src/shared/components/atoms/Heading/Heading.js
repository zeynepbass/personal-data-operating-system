export function Heading({ title, description, className, descriptionClassName }){
    return(
        <div>
            <h3 className={className}>{title}</h3>
            {description && (
                <p className={descriptionClassName}>{description}</p>
            )}
        </div>
    )
}
