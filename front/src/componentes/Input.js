
const Input = ({ id, value, setValue, type, placeholder, required = false, children }) => {
    return (
      <div className={'inputWrapper'}>
        <label htmlFor={id}>{children}</label>
        <input
          value={value}
          id={id}
          name={id}
          type={type}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  };
  
  export default Input;