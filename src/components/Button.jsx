const Button = ({ text, onClick }) => {
  return (
      <a
        href="/auth/login"
        className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        onClick={onClick}
      >
        {text}
      </a>
  );
};

export default Button;
