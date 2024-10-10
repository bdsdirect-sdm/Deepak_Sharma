import React from 'react'

const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses,
    fluid,
    type
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
    type={type}
    // fluid={fluid ? fluid:""}
    className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : `${customClasses ? `${customClasses}`:" bg-yellow-300"}`
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold ${customClasses}`}
    >
        {
            children ? (<div className='flex items-center justify-center gap-2'>
                <span>
                    {text}
                </span>
                {children}
            </div>) : (text)
        }
    </button>
  )
}

export default IconBtn