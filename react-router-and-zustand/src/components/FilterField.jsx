export function FilterField({ children, label, htmlFor }) {
  return (
    <>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
    </>
  )
}
