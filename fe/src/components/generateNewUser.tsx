interface GenerateNewUserProps {
  updatePage: Function;
}

const fetchFunction = async (endpoint: string, method: string) => {
  try {
    const response = await fetch(endpoint, { method });
    return await response;
  } catch (err) {
    console.log(err);
  }
};

const GenerateNewUser: React.FC<GenerateNewUserProps> = ({ updatePage }) => {
  const generateNewUser = async () => {
    try {
      const usersAndPages = await fetchFunction(
        `http://localhost:3001/users`,
        "POST"
      ).then((res) => {
        if (res) return res.json();
        else return null;
      });
      updatePage();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button
      className="bg-green-500 p-5 rounded-full text-white my-4"
      onClick={() => generateNewUser()}
    >
      Generate New User
    </button>
  );
};

export { GenerateNewUser };
