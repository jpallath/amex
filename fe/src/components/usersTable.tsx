import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "./ui/table";
import { Pagination } from "./pagination";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { GenerateNewUser } from "./generateNewUser";

const fetchFunction = async (
  endpoint: string,
  method: string,
  page: number = 1
) => {
  try {
    const request = !page ? endpoint : `${endpoint}?page=${page}`;
    const response = await fetch(request, { method });
    return await response;
  } catch (err) {
    console.log(err);
  }
};

const UsersTable: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([
    {
      _id: "",
      profileImage: "",
      name: "",
      age: 0,
      fullAddress: {
        city: "",
        country: "",
        postcode: "",
        state: "",
        streetAddress: "",
      },
    },
  ]);
  async function fetchUsersAndPages() {
    try {
      const usersAndPages = await fetchFunction(
        `http://localhost:3001/users`,
        "GET",
        currentPage
      ).then((res) => {
        if (res) return res.json();
        else return null;
      });
      setUsers(usersAndPages.users);
      setPageCount(usersAndPages.pages);
      setCurrentPage(usersAndPages.currentPage);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUsersAndPages();
  }, [currentPage]);
  const handleOnClick = (id: string) => {
    navigate(`/users/${id}`);
  };
  return (
    <div className="flex items-center flex-col gap-y-2">
      <GenerateNewUser updatePage={() => fetchUsersAndPages()} />
      {users.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Age</TableHead>
              <TableHead className="text-center">City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                onClick={() => handleOnClick(user._id)}
                className="cursor-pointer"
              >
                <TableCell className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      className="rounded-full w-12"
                      src={user.profileImage}
                    />
                  </Avatar>
                  <div>{user.name}</div>
                </TableCell>
                <TableCell className="text-center">{user.age}</TableCell>
                <TableCell className="text-center">
                  {user.fullAddress.city}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
      <Pagination
        updatePage={setCurrentPage}
        totalCount={pageCount}
        current={currentPage}
      />
    </div>
  );
};

export { UsersTable };
