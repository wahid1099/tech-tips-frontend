export const columns = [
  { name: "TITLE", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "TOTAL LIKES", uid: "upVotes" },
  { name: "TOTAL UNLIKES", uid: "downVotes" },
  { name: "TOTAL COMMENTS", uid: "comments" },

  { name: "POST DATE", uid: "createdAt" },

  { name: "ACTIONS", uid: "actions" },
];

export const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
