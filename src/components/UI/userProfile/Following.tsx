import React, { useState, useEffect } from "react";
import {
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { getUserFollowersAndFollowing } from "@/src/services/UserServices/Userserivce"; // Import the service for data fetching

interface User {
  _id: string;
  name: string;
  email: string;
  profession: string;
  role: string;
  gender: string;
  birthDate: string;
  isVerified: boolean;
  profileImage: string;
  followers: any[];
  following: any[];
  payments: any[];
  bio: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userName: string;
  __v: number;
}

const Following = () => {
  const [following, setFollowing] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserFollowersAndFollowing();
        setFollowing(data.following || []); // Set the following data
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop the spinner
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once on mount

  if (loading) return <Spinner size="lg" />;
  if (error)
    return <div>Failed to load followers and following data: {error}</div>;

  return (
    <div>
      <h3 className="mb-4">My Following</h3>
      {following.length === 0 ? (
        <p>Not following anyone yet.</p>
      ) : (
        <Table aria-label="Following table" isStriped>
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Profession</TableColumn>
            <TableColumn>Profile Image</TableColumn>
          </TableHeader>
          <TableBody>
            {following.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.profession}</TableCell>
                <TableCell>
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Following;
