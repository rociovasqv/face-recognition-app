const Container = ({ children }) => {
  return (
    <div className="mx-auto px-10 sm:container sm:px-0 flex flex-col justify-center items-center w-full">
      {children}
    </div>
  );
};

export default Container;