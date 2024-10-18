// components/UserCardRow.tsx
import {
  Card,
  TableRow,
  TableCell,
  Image,
  CardFooter,
} from "@nextui-org/react";

interface UserCardRowProps {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export const UserCardRow: React.FC<UserCardRowProps> = ({
  _id,
  name,
  email,
  profileImage,
}) => {
  return (
    <TableRow key={_id}>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        <Card>
          <Image
            src={
              profileImage || "https://randomuser.me/api/portraits/men/35.jpg"
            }
            alt={name}
            width="100%"
            height={160}
          />
          <CardFooter>{name}</CardFooter>
        </Card>
      </TableCell>
    </TableRow>
  );
};
