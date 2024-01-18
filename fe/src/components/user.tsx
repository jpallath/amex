import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const fetchFunction = async (endpoint: string, method: string) => {
  try {
    const response = await fetch(endpoint, { method });
    return await response;
  } catch (err) {
    console.log(err);
  }
};

const User: React.FC<{}> = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState({
    profileImage: "",
    _id: "",
    name: "",
    age: 0,
    fullAddress: {
      streetAddress: "",
      city: "",
      country: "",
      postcode: "",
      state: "",
    },
    dateOfBirth: "",
    phoneNumber: "",
    emailAddress: "",
  });

  useEffect(() => {
    async function fetchUsersAndPages() {
      try {
        const user = await fetchFunction(
          `http://localhost:3001/users/${id}`,
          "GET"
        ).then((res) => {
          if (res) return res.json();
          else return null;
        });
        setUser(user[0]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsersAndPages();
  });

  const getDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <div>
      <Link
        to="/"
        className="absolute m-4 p-4 border-2 border-slate-600 rounded-lg flex gap-x-2 z-50"
      >
        <ArrowLeft />
        Back
      </Link>
      <div className="relative h-screen">
        <div className="flex items-center justify-center h-screen flex flex-col items-center gap-y-5">
          <img
            className="rounded-full"
            src={user.profileImage}
            alt={user.name}
          />
          <h1>
            Name <strong>{user.name}</strong>
          </h1>
          <h2>
            Age <strong>{user.age}</strong>
          </h2>
          <h2>
            Date of Birth <strong>{getDate(user.dateOfBirth)}</strong>
          </h2>
          <AddressComponent address={user.fullAddress} />
          <h2>
            Email Address <strong>{user.emailAddress}</strong>
          </h2>
          <h2>
            Phone Number <strong>{user.phoneNumber}</strong>
          </h2>
        </div>
      </div>
    </div>
  );
};

interface Address {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

interface AddressProps {
  address: Address;
}

const AddressComponent: React.FC<AddressProps> = ({ address }) => {
  const { streetAddress, city, state, country, postcode } = address;
  return (
    <div className="flex flex-col items-center">
      <h3>{streetAddress}</h3>
      <h3>
        {city}, {state} {postcode}
      </h3>
      <h3>{country}</h3>
    </div>
  );
};

export { User };
